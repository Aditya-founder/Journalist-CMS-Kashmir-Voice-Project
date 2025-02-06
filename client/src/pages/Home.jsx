import React, { useEffect, useState } from 'react';
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import PostCard from '../components/PostCard';
import { Button, Spinner } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const[blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const[loading1, setLoading1] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try{
      const fetchPosts = async () => {
        setLoading(true);
        const res = await fetch('/api/post/getposts?limit=9&category=Article&order=asc');
        if (!res.ok) {
          setLoading(false);
          return;
        }
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
      };
      fetchPosts();
    }
    catch (error) {
      console.error(error);
      }
  }, []);

  
  useEffect(() => {
    try{
    const fetchPosts = async () => {
      setLoading1(true);
      const res = await fetch(`/api/post/getposts?limit=9&excludeCategory=Article`);
      if (!res.ok) {
        setLoading1(false);
        return;
      }
      const data = await res.json();
      setBlogs(data.posts);
      setLoading1(false);
    };
    fetchPosts();
  }
  catch (error) {
    console.error(error);
    }
  }, []);



  return (
    <>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:h-auto">
  <div className="grid md:grid-cols-1 gap-12">
    {/* Content Section */}
    <div className="space-y-6 text-center md:text-left">
      <h1 className="text-4xl font-light mb-8 font-['Optima'] text-center">“Hello! Welcome to My Profile”</h1>
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
        If you're curious to see where my words have taken me, <a href="https://linktr.ee/fizalakhan"  className='text-teal-400 cursor-pointer hover:underline'>explore my work here.</a>
      </p>

      {/* Social Links */}
      <div className="flex justify-center md:justify-start space-x-4 pt-4">
        <a 
          href="https://www.facebook.com/fizala.khan.9" 
          className="text-black hover:opacity-75 transition-opacity"
          aria-label="facebook"
        >
          <FaFacebook className="w-6 h-6 dark:text-gray-200" />
        </a>
        <a 
          href="https://www.instagram.com/fizalalalala" 
          className="text-black hover:opacity-75 transition-opacity"
          aria-label="Instagram"
        >
          <FaInstagram className="w-6 h-6 dark:text-gray-200" />
        </a>

      </div>
    </div>
  </div>
</div>


     {/* article Posts Section */}
     <div className="mt-12 lg:mt-[14vh] px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white text-center mb-4">Latest Articles</h2>
        {loading ? (
          <>
          <Spinner/>
          <p className="text-center ">Loading Articles...</p>
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 gap-6">
            {posts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        )}
       
        <Button onClick={()=> navigate('/article')} outline  className='mx-auto mt-6'>See More Articles</Button>
        
      </div>

      
     {/* article Posts Section */}
     <div className="mt-12 lg:mt-[14vh] px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white text-center mb-4">Latest Blogs</h2>
        {loading1 ? (
          <>
          <Spinner/>
          <p className="text-center ">Loading Blogs...</p>
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 gap-6">
            {blogs.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        )}

        <Button onClick={()=> navigate('/blogs')} outline  className='mx-auto mt-6'>See More Blogs</Button>
        
        
      </div>

    </>
  );
};

export default Home;
