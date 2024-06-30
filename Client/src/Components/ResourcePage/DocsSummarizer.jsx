import React from 'react';
import TechnologyCard from './TechnologyCard';

const DocsSummarizer = () => {
  // Sample technology data
  const technologies = [
    {
      name: 'React',
      description: 'A JavaScript library for building user interfaces.',
      imageUrl: 'https://reactjs.org/logo-og.png'
    },
    {
      name: 'Node.js',
      description: 'An open-source, cross-platform JavaScript runtime environment.',
      imageUrl: 'https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg'
    },
    {
      name: 'Python',
      description: 'A high-level programming language known for its simplicity and readability.',
      imageUrl: 'https://www.python.org/static/community_logos/python-logo.png'
    },
    {
      name: 'Angular',
      description: 'One framework. Mobile & desktop.',
      imageUrl: 'https://angular.io/assets/images/logos/angular/angular.png'
    },
    {
      name: 'Vue.js',
      description: 'The progressive JavaScript framework.',
      imageUrl: 'https://vuejs.org/images/logo.png'
    },
    {
      name: 'Django',
      description: 'The web framework for perfectionists with deadlines.',
      imageUrl: 'https://www.djangoproject.com/s/img/logos/django-logo-negative.png'
    },
    {
      name: 'Express.js',
      description: 'Fast, unopinionated, minimalist web framework for Node.js.',
      imageUrl: 'https://expressjs.com/images/express-facebook-share.png'
    }
    // Add more technologies here
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mt-8 mb-12 text-gray-800">Discover Technologies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {technologies.map((technology, index) => (
          <TechnologyCard
            key={index}
            name={technology.name}
            description={technology.description}
            imageUrl={technology.imageUrl}
            className="rounded-lg shadow-md p-4 bg-white"
          />
        ))}
      </div>
    </div>
  );
};

export default DocsSummarizer;
