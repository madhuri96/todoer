import React from 'react';
import './favIcon.css';

const FavIcon = ({ todoId, bookmarked, onToggleBookmark }) => {
  const handleToggle = () => {
    onToggleBookmark(todoId);
  };

  return (
    <button
      className={`fav-icon ${bookmarked ? 'favorited' : ''}`}
      onClick={handleToggle}
    >
      {bookmarked ? '❤️' : '🖤'}
    </button>
  );
};

export default FavIcon;
