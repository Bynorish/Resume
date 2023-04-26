import React from 'react';
import './AboutUs.css';
import { useNavigate } from 'react-router-dom';

function AboutUs() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate('/');
  };
  const testimonials = [
    {
      name: 'John Joeman',
      image: 'https://nwestco.com/wp-content/uploads/2016/08/13.jpg',
      text: 'AMAZING website WOW! I highly recommend it.',
    },
    {
      name: 'Bob Bobinson',
      image: 'https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX4352347.jpg',
      text: 'My sword loves this website!',
    },
    {
      name: 'Alice Johnson',
      image: 'https://thumbs.dreamstime.com/b/professional-business-woman-smiling-outdoor-close-up-portrait-55472495.jpg',
      text: 'WEBSITE COOL WOW!',
    },
  ];

  return (
    <div className="about-us">
      <h1>About Us</h1>
      <p>Welcome to our website!</p>
      <div className="testimonials">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial">
            <img
              className="testimonial-image"
              src={testimonial.image}
              alt={testimonial.name}
              style={{ width: '200px', height: '160px' }}
            />
            <h3>{testimonial.name}</h3>
            <p>{testimonial.text}</p>
          </div>
        ))}
      </div>
      <div className="contact-info">
        <h2>Contact Us</h2>
        <p>Email: info@yes.com</p>
        <p>Phone: +1 (123) 456-7890</p>
        <p>Address: 123 Main St, Anytown, USA</p>
      </div>

      <button className="back-button" onClick={handleGoBack}> Back to login </button>

    </div>
  );
}

export default AboutUs;