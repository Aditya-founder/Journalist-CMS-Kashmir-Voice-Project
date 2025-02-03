import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PostCard from '../components/PostCard';
// import Loader from '../components/Loader'; // Assume you have a loader component
import { Button, Spinner } from 'flowbite-react';

const Blogs = () => {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('page', page);
      
      try {
        const res = await fetch(`/api/post/getposts?${urlParams.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch posts');
        
        const data = await res.json();
        setPosts((prevPosts) => (page === 1 ? data.posts : [...prevPosts, ...data.posts]));
        setShowMore(data.posts.length === 9); // Assuming 9 is the per-page limit
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    
    fetchPosts();
  }, [location.search, page]);

  return (
    <div className="max-w-1xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Latest Blogs</h1>
      {loading && page === 1 ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500 text-center">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div className="p-2">
              <PostCard key={post.id} post={post} />
            </div>
          ))}
        </div>
      )}
      {showMore && (
        <div className="flex justify-center mt-6">
          <Button onClick={() => setPage(page + 1)} gradientDuoTone="purpleToBlue">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default Blogs;