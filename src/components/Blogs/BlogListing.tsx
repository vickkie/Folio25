import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./css/bloglisting.css";

export default function BlogListing() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [sortOption, setSortOption] = useState("Newest");

  useEffect(() => {
    fetch('/json/blogs.json')
      .then(response => response.json())
      .then(data => setBlogPosts(data));
  }, []);

  const sortPosts = (posts) => {
    switch (sortOption) {
      case "Newest":
        //@ts-ignore
        return posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
      case "Most Popular":
        return posts.filter(post => post.isPopular);
      case "Recommended":
        return posts.filter(post => post.isRecommended);
      default:
        return posts;
    }
  };

  return (
    <div className="blog-container">
      <div className="blogHero">
        <h1 className="blog-title">Insights</h1>
        <h2 className="blog-subTitle">See patterns that others don't</h2>
      </div>

      <div className="blogSorting">
        <div className="divider">
          <button className="sort-button" onClick={() => setSortOption("Most Popular")}>Most Popular</button>
          <button className="sort-button" onClick={() => setSortOption("Recommended")}>Recommended</button>
        </div>
      </div>

      <div className="blog-grid">
        {sortPosts(blogPosts).map((post) => (
          <div key={post.id} className="blog-card">
            <img src={post.heroImage} alt={post.title} className="blog-card-image" />
            <div className="blogDetail">
              <h2 className="blog-card-title">{post.title}</h2>
              <p className="blog-card-date">Published on: {new Date(post.date).toLocaleDateString()}</p>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              <Link to={`/insights/${post.id}`} className="blog-card-link">Learn More</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="readMore">
        <div>
          <h1 className="getMore">
            Get More insights
          </h1>
        </div>
         <Link to={`/insights`} className="blog-card-link">Read more</Link>
      </div>
    </div>
  );
}
