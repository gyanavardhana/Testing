import React from 'react';

const CareerAdvice = () => {
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Career Advice</h2>

      {/* Career Advice Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Resume Writing Tips Section */}
        <div className="bg-white shadow-md rounded-md p-6">
          <h3 className="text-xl font-bold mb-4">Resume Writing Tips</h3>
          <ul className="list-disc pl-4">
            <li>Tailor your resume to each job application.</li>
            <li>Highlight your relevant skills and experiences.</li>
            <li>Use action verbs to describe your accomplishments.</li>
            <li>Keep your resume concise and easy to read.</li>
          </ul>
        </div>

        {/* Interview Techniques Section */}
        <div className="bg-white shadow-md rounded-md p-6">
          <h3 className="text-xl font-bold mb-4">Interview Techniques</h3>
          <ul className="list-disc pl-4">
            <li>Research the company and prepare questions to ask.</li>
            <li>Practice answering common interview questions.</li>
            <li>Dress appropriately and arrive on time.</li>
            <li>Communicate confidently and clearly.</li>
          </ul>
        </div>

        {/* Career Growth Insights Section */}
        <div className="bg-white shadow-md rounded-md p-6">
          <h3 className="text-xl font-bold mb-4">Career Growth Insights</h3>
          <ul className="list-disc pl-4">
            <li>Set clear goals and develop a plan to achieve them.</li>
            <li>Seek out learning opportunities and professional development.</li>
            <li>Build relationships with mentors and network within your industry.</li>
            <li>Stay adaptable and open to new opportunities.</li>
          </ul>
        </div>

        {/* Additional Career Tip Section */}
        <div className="bg-white shadow-md rounded-md p-6">
          <h3 className="text-xl font-bold mb-4">Additional Career Tip</h3>
          <ul className="list-disc pl-4">
            <li>Always follow up after an interview with a thank-you note or email.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CareerAdvice;
