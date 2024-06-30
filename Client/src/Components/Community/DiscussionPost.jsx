import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/outline'; // Import StarIcon from Heroicons version 2

const DiscussionPost = ({ post, onStar, onReply }) => {
  const [starred, setStarred] = useState(false);
  const [replying, setReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleStar = () => {
    setStarred(!starred);
    onStar(post.id, !starred);
  };

  const handleReply = () => {
    setReplying(!replying);
  };

  const handleSubmitReply = (e) => {
    e.preventDefault();
    onReply(post.id, replyContent);
    setReplyContent('');
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="text-gray-600 mt-2">{post.content}</p>
      <div className="flex items-center mt-4">
        <button onClick={handleStar} className={`mr-4 ${starred ? 'text-yellow-500' : 'text-gray-500'}`}>
          <StarIcon className="h-6 w-6" /> {/* Use StarIcon from Heroicons version 2 */}
        </button>
        <button onClick={handleReply} className="text-gray-500">Reply</button>
      </div>
      {replying && (
        <form onSubmit={handleSubmitReply} className="mt-4">
          <textarea
            placeholder="Write your reply..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            rows="2"
            required
          ></textarea>
          <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Post Reply
          </button>
        </form>
      )}
    </div>
  );
};

export default DiscussionPost;
