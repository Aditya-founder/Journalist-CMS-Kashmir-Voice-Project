import React, { useEffect, useState } from 'react';
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import PostCard from '../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch('/api/post/getposts');
      if (!res.ok) {
        setLoading(false);
        return;
      }
      const data = await res.json();
      setPosts(data.posts);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:h-auto">
  <div className="grid md:grid-cols-1 gap-12">
    {/* Content Section */}
    <div className="space-y-6 text-center md:text-left">
      <h1 className="text-4xl font-light mb-8 font-['Optima'] text-center">Hello! Welcome to my profile</h1>
      <div className='h-1 bg-gray-700'></div>

      <p className="text-gray-800 text-2xl dark:text-gray-200  leading-relaxed">
        I’m Fizala Khan—a writer, researcher, journalist, and advocate. With over nine years of experience across journalism, legal research, and content creation, I’ve dabbled in everything from investigative reporting to academic writing and creating content for brands.
      </p>

      <p className="text-gray-800  dark:text-gray-200 text-2xl leading-relaxed">
        I’ve worked as a sub-editor and journalist at The Kashmiriyat, contributed to research papers at Mumbai University, and crafted compelling content for companies like Woovly and Novus Digital.
      </p>

      <p className="text-gray-800  dark:text-gray-200 text-2xl leading-relaxed">
        Justice, stories, and truth are three things I chase with equal passion, and that is why my background in Intellectual Property and Criminal Law gives my writing an analytical edge. But at heart, I love making information accessible and engaging—whether through articles, essays, or visuals.
      </p>

      <p className="text-gray-800 dark:text-gray-200 text-2xl leading-relaxed">
        When I’m not buried in research or crafting the perfect sentence, you’ll probably find me immersed in reading or chasing down the next great story.
      </p>

      <p className="text-gray-800 dark:text-gray-200 text-2xl leading-relaxed">
        If you're curious to see where my words have taken me, explore my work here.
      </p>

      {/* Social Links */}
      <div className="flex justify-center md:justify-start space-x-4 pt-4">
        <a 
          href="https://x.com/banihalich?mx=2" 
          className="text-black hover:opacity-75 transition-opacity"
          aria-label="Twitter"
        >
          <FaTwitter className="w-6 h-6 dark:text-gray-200" />
        </a>
        <a 
          href="https://www.linkedin.com/in/fizala-khan-259a5b1b1" 
          className="text-black hover:opacity-75 transition-opacity"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="w-6 h-6 dark:text-gray-200" />
        </a>
        
        <a 
          href="https://www.facebook.com/fizala.khan.9" 
          className="text-black hover:opacity-75 transition-opacity"
          aria-label="LinkedIn"
        >
          <FaFacebook className="w-6 h-6 dark:text-gray-200" />
        </a>
        <a 
          href="https://www.facebook.com/fizala.khan.9" 
          className="text-black hover:opacity-75 transition-opacity"
          aria-label="LinkedIn"
        >
          <FaInstagram className="w-6 h-6 dark:text-gray-200" />
        </a>

      </div>
    </div>
  </div>
</div>


     {/* Blog Posts Section */}
     <div className="mt-12 lg:mt-[14vh] px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white text-center mb-4">Latest Blog Posts</h2>
        {loading ? (
          <p className="text-center ">Loading posts...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 gap-6">
            {posts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
