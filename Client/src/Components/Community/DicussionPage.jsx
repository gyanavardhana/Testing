import React, { useState } from 'react';
import DiscussionPost from './DiscussionPost';
import DiscussionForm from './DiscussionForm';

const DiscussionPage = () => {
  const [posts, setPosts] = useState([]);

  const addPost = (post) => {
    setPosts([...posts, { id: Date.now(), ...post, replies: [] }]);
  };

  const handleStar = (postId, isStarred) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, starred: isStarred } : post));
  };

  const handleReply = (postId, replyContent) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, replies: [...post.replies, replyContent] } : post));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Discussion Page</h1>
      <DiscussionForm onSubmit={addPost} />
      <div>
        {posts.map((post, index) => (
          <DiscussionPost
            key={index}
            post={post}
            onStar={handleStar}
            onReply={handleReply}
          />
        ))}
      </div>
    </div>
  );
};

export default DiscussionPage;
