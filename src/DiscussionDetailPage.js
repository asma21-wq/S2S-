import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./DiscussionDetailPage.css";

const discussionsData = {
  1: { title: "How can AI improve healthcare outcomes?" },
  2: { title: "What are the real-world applications of Quantum Computing?" },
  3: { title: "Blockchain for sustainable energy - Ideas and insights" },
};

const DiscussionDetailPage = () => {
  const { id } = useParams();
  const discussion = discussionsData[id];
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <div className="discussion-detail-page">
      <h1>{discussion.title}</h1>
      <div className="discussion-comments">
        <h2>Comments</h2>
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to share your thoughts!</p>
        ) : (
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="comment-box">
        <textarea
          placeholder="Write your comment here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows="4"
        ></textarea>
        <button onClick={handleAddComment}>Post Comment</button>
      </div>
    </div>
  );
};

export default DiscussionDetailPage;
