import React from 'react';

const NewsFeed = () => {
  const news = [
    {
      id: 1,
      category: 'Technology',
      title: 'New iPhone Model Announced',
      description: 'Apple unveils the latest iPhone model with advanced features.',
    },
    {
      id: 2,
      category: 'Sports',
      title: 'Football Championship Finals',
      description: 'Exciting match between top teams in the football championship finals.',
    },
    {
      id: 3,
      category: 'Business',
      title: 'Stock Market Update',
      description: 'Latest updates on stock market trends and performance.',
    },
    {
      id: 4,
      category: 'Entertainment',
      title: 'New Movie Release',
      description: 'Highly anticipated movie hits theaters this weekend. Get the details here.',
    },
    {
      id: 5,
      category: 'Health',
      title: 'New Study on Nutrition',
      description: 'Researchers reveal findings from a groundbreaking study on nutrition and health.',
    },
  ];

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4 text-center">News Feed</h2>
      <div className="flex flex-wrap justify-center">
        {news.map((item) => (
          <div key={item.id} className="max-w-sm rounded overflow-hidden shadow-lg m-4">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{item.title}</div>
              <p className="text-gray-700 text-base">{item.description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
