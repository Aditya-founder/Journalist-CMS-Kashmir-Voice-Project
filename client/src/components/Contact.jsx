import { useState } from 'react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { Button } from 'flowbite-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending...');
  
    const emailParams = {
      from_name: formData.name,  // Must match the EmailJS template variable
      from_email: formData.email,
      message: formData.message,
      to_name : "Fizala Khan"
    };
  
    emailjs
      .send(
       'service_5eccz3s', // Replace with your EmailJS service ID
  'template_gqmg5zh', // Replace with your EmailJS template ID
        emailParams,
        '_Alg2UVDl8KQ85xy3' // Replace with your EmailJS public key
      )
      .then(
        (response) => {
          setStatus('Message sent successfully!');
          setFormData({ name: '', email: '', message: '' });
        },
        (error) => {
          setStatus('Failed to send the message. Please try again.');
        }
      );
  };
  

  'service_5eccz3s', // Replace with your EmailJS service ID
  'template_gqmg5zh', // Replace with your EmailJS template ID
  formData,
  '_Alg2UVDl8KQ85xy3' // Replace with your EmailJS public key

  return (
    <section className="flex  flex-col md:flex-row items-center justify-center gap-8 p-6 max-w-6xl mx-auto">
      {/* Contact Form */}
      
      <div className="w-full mx-auto md:w-1/2">

        <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-lg rounded-lg p-6 dark:bg-transparent border border-gray-600">
      <h2 className="text-3xl font-bold text-gray-800  dark:text-white text-center  mb-6 ">Contact Me</h2>
          <div >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Email"
              required
            />
          </div>
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Message"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="text-center">
            <Button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Send Message</Button>
          </div>
        </form>
        {status && <p className="text-center mt-4 text-gray-700">{status}</p>}
      </div>

      
    </section>
  );
};

export default Contact;
