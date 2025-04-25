import React, { useEffect, useState, useCallback } from "react";
import api from "../services/api";

const AdminPanel = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("desc");
  const [commentInputs, setCommentInputs] = useState({});

  const fetchFeedbacks = useCallback(async () => {
    try {
      const res = await api.get(`/feedback?rating=${filter}&sort=${sort}`);
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Failed to fetch feedbacks", err);
    }
  }, [filter, sort]);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  const handleCommentChange = (id, value) => {
    setCommentInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleCommentSubmit = async (id) => {
    if (!commentInputs[id]) return;
    try {
      await api.post(`/feedback/${id}/comment`, {
        comment: commentInputs[id],
      });
      setCommentInputs((prev) => ({ ...prev, [id]: "" }));
      fetchFeedbacks();
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Panel</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>Filter by Rating: </label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="">All Ratings</option>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} Stars
            </option>
          ))}
        </select>

        <label style={{ marginLeft: "1rem" }}>Sort: </label>
        <select onChange={(e) => setSort(e.target.value)} value={sort}>
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </select>
      </div>

      {feedbacks.map((f) => (
        <div key={f.id} style={{ border: "1px solid #ccc", marginBottom: "20px", padding: "10px" }}>
          <p>{f.text} - {f.rating} ⭐</p>
          <small>By: {f.user?.name || "Anonymous"}</small>
          <br />
          {f.image && (
            <img
              src={`http://localhost:3000/${f.image}`}
              alt="feedback"
              width="100"
              style={{ marginTop: "10px" }}
            />
          )}
          
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              placeholder="Add comment"
              value={commentInputs[f.id] || ""}
              onChange={(e) => handleCommentChange(f.id, e.target.value)}
              style={{ marginRight: "5px" }}
            />
            <button onClick={() => handleCommentSubmit(f.id)}>Submit</button>
          </div>

          {f.comment && (
            <p style={{ color: "green", marginTop: "10px" }}>
              <strong>Admin Comment:</strong> {f.comment}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
