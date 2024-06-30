import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResourcesPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [reposByCompany, setReposByCompany] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchRepos = async () => {
    try {
      setLoading(true);
      let allRepos = [];
      let page = 1;
      let response;

      do {
        response = await axios.get(`https://api.github.com/orgs/${companyName}/repos`, {
          params: {
            type: 'all',
            sort: 'updated', // Sort by last updated
            per_page: 10, // Maximum number of repositories per page
            page: page
          }
        });
        allRepos = [...allRepos, ...response.data];
        page++;
      } while (response.data.length === 10); // Continue fetching until less than 10 items are returned

      // Group repositories by company name
      const reposGrouped = allRepos.reduce((acc, repo) => {
        const company = repo.owner.login;
        if (!acc[company]) {
          acc[company] = [];
        }
        acc[company].push(repo);
        return acc;
      }, {});

      setReposByCompany(reposGrouped);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching repositories:', error);
      setLoading(false);
    }
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleCompanyChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchRepos();
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Open Source Repositories</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Company Name"
          className="mb-4 border border-gray-300 rounded px-3 py-1"
          value={companyName}
          onChange={handleCompanyChange}
        />
        <select
          className="mb-4 border border-gray-300 rounded px-3 py-1"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          <option value="">Select Language</option>
          <option value="JavaScript">JavaScript</option>
          <option value="TypeScript">TypeScript</option>
          {/* Add more options as needed */}
        </select>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {Object.entries(reposByCompany).map(([company, repos]) => (
            <div key={company} className="mb-8">
              <h3 className="text-xl font-semibold mb-2">{company}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {repos.map(repo => (
                  <div key={repo.id} className="border border-gray-300 rounded p-4">
                    <h4 className="font-semibold mb-2">{repo.name}</h4>
                    <p className="text-gray-600">{repo.description}</p>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View on GitHub</a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
