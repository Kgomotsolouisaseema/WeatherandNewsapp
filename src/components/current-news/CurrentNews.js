import React from "react";

function CurrentNews({ title, description, category }) {
  return (
    <div className="news-card">
      <div className="news-card-body">
        <h5 className="news-card-title">{title}</h5>
        <p className="news-card-text">{description}</p>
        <p className="news-card-category">Category: {category}</p>
        <hr />
      </div>
      <br />
    </div>
  );
}

export default CurrentNews;
