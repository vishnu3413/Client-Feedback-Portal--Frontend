import React, { useState } from "react";
import api from "../services/api";

const FeedbackForm = () => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", text);
    formData.append("rating", rating);
    if (image) formData.append("image", image);

    await api.post("/feedback", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    alert("Feedback submitted!");
    setText("");
    setRating(5);
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit Feedback</h2>
      <textarea value={text} onChange={(e) => setText(e.target.value)} required />
      <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} required />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FeedbackForm;
