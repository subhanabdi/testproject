import React, { useState, useEffect } from 'react';
import './App.css';
import PostItem from './PostItem';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [posts, setPosts] = useState([]);
 
 const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('asc');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>An error occurred while loading the posts. Please try again later.</p>
        <p>Error details: {error.message}</p>
      </div>
    );
  }

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (sortType === 'asc') {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  return (
    <div className="App container">
      <h1 className="my-4">Posts</h1>
      <input
        type="text"
        placeholder="Search by title..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control my-2"
      />
      <select onChange={(e) => setSortType(e.target.value)} className="form-control my-2">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <div className="container">
        <div className="row">
          {sortedPosts.map((post) => (
            <div className="col-sm-6">
              <PostItem key={post.id} post={post} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default App;
