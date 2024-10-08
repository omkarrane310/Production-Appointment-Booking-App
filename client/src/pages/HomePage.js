import React, {  useState } from "react";

import Layout from "./../components/Layout";

import { FaCheck } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { IoMagnetSharp } from "react-icons/io5";
import { GrPowerCycle } from "react-icons/gr";
import { BiChevronUp } from "react-icons/bi";
import { Link } from "react-router-dom";

const HomePage = () => {

  const [activeIndex, setActiveIndex] = useState(null);



  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Layout className="home">
      <div className="home-container">
        <div className="l-home">
          <h2>Discover the easiest way to schedule appointments with the #1 online booking system</h2>
          <span>
            Save time spent on coordinating appointments over phone and email with an all-in-one appointment booking software. Accept online bookings 24x7, automate payments, business management, marketing, and more!
          </span>
          <div className="h-l-btn">
            <Link id="link" to="/professionals">Book Appointment</Link>
          </div>
        </div>
        <div className="r-home">
          <img
           
            src="https://www.appointy.com/online-booking-software/wp-content/uploads/2020/10/Customer-scheduling-an-online-appointment.svg"
            alt="Customer scheduling an appointment for a service using Appointy's online booking portal"
            loading="lazy"
          />
        </div>
      </div>

      <div className="home-details">
        <h2>Appointy - simple, functional, powerful: no compromises!</h2>
        <p>Our online appointment scheduling software has everything you need to grow & manage your business in one easy-to-use and powerful user interface</p>
        <div className="home-details-2">
          <div className="home-dets">
            <div className="icon-container">
              <FaCheck className="icon" />
            </div>
            <div className="text">
              <h3>Schedule online</h3>
              <p>Eliminate email/call back-and-forth with web-based scheduling</p>
            </div>
          </div>
          <div className="home-dets">
            <div className="icon-container">
              <TiMessages className="icon" />
            </div>
            <div className="text">
              <h3>Boost productivity</h3>
              <p>Automate daily tasks to improve staff productivity and manage your entire schedule in one place</p>
            </div>
          </div>
          <div className="home-dets">
            <div className="icon-container">
              <IoMagnetSharp className="icon" />
            </div>
            <div className="text">
              <h3>Attract customers</h3>
              <p>Get bookings directly from Facebook, Instagram, Google, and your business website</p>
            </div>
          </div>
          <div className="home-dets">
            <div className="icon-container">
              <GrPowerCycle className="icon" />
            </div>
            <div className="text">
              <h3>Retain customers</h3>
              <p>Understand your customers better and deliver personalized experiences</p>
            </div>
          </div>
        </div>
      </div>

     

      <div className="feedback-container">
        <h2>200,000+ customers trust Appointy for their appointment scheduling needs</h2>
        <div className="feedback-section">
          <div className="feedback-card">
            <img src="https://www.appointy.com/online-booking-software/wp-content/uploads/2020/10/Vector.svg" alt="Quote" className="quote-icon" />
            <p className="feedback-text">
              I am extremely satisfied with Appointy.
              <br /><br />
              The client booking software makes it super easy for my clients to use and book appointments online with me. I especially love their customer service, they always respond in a timely manner at all hours!
              <br /><br />
              Before the trial was even complete, I had clients scheduled for my service, pay me through Paypal (linked easily) and connect via Zoom (also linked easily).
            </p>
            <p className="feedback-author">- Zach T, Spa Therapist</p>
          </div>
          <div className="feedback-card">
            <img src="https://www.appointy.com/online-booking-software/wp-content/uploads/2020/10/Vector.svg" alt="Quote" className="quote-icon" />
            <p className="feedback-text">
              Great software to market your appointments on multiple platforms
              <br /><br />
              Appointy’s online appointment booking app is easy to use and also available for free!
              <br /><br />
              I loved the integrations with multiple platforms like Google analytics, adding a book now on Instagram and especially a schedule directly from Google My Business.
              <br /><br />
              Liked how Appointy easily automated my daily tasks by connecting to Zapier! I completely recommend Appointy.
            </p>
            <p className="feedback-author">- Claudia L., Massage Therapist</p>
          </div>
        </div>
      </div>

       {/* piece */}
       <div className="piece-container">
  <h2>Your peace of mind is our top priority!</h2>
  <div className="piece-cards">
    <div className="piece-card">
      <img src="/headphone.svg" alt="Super Support" />
      <h3>Super Support</h3>
      <p>Appointy is supported by a team of dedicated professionals who are always available via email, chat and phone.</p>
    </div>
    <div className="piece-card">
      <img src="/location.svg" alt="Multi-Location Management" />
      <h3>Multi-Location Management</h3>
      <p>Appointy grows with your business! When you expand your business to multiple locations, Appointy allows easy management of all your locations & clients from a centralized admin portal.</p>
    </div>
    <div className="piece-card">
      <img src="./computer.svg" alt="Free Setup Assistance & Easy Migration" />
      <h3>Free Setup Assistance & Easy Migration</h3>
      <p>Easy onboarding and free personalized setup assistance from people who have onboarded thousands of businesses, you get started with Appointy in no time. Need to shift from your existing system? We take care of everything!</p>
    </div>
    <div className="piece-card">
      <img src="./shield.svg" alt="Security" />
      <h3>Security</h3>
      <p>We take customer data security very seriously. Your data is safe, backed-up on cloud, and you retain its complete ownership. Our application is hosted on Google Cloud which adheres to the highest standards of reliability and data security.</p>
    </div>
  </div>
</div>

      <div className="faq-container">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-section">
          {[
            {
              question: "What is an online booking system?",
              answer: "An online booking system allows the customers to book appointments with you or book your services through an online platform. Such a system allows the business owner/admin to control and oversee the availability of their services and the bookable hours that are available to the customers. An online scheduling software comes with an inbuilt reminder system that helps sending out automated email/SMS reminders to customers. Appointy is an advanced and free booking system that also allows the online booking portal to be customized to mirror your brand."
            },
            {
              question: "How can I manage all the bookings that are made in the booking software?",
              answer: "You can manage all the bookings through the admin panel provided in the software. It allows you to view, modify, and cancel bookings. You can also set up automatic reminders and notifications for both the staff and customers."
            },
            {
              question: "Can different staff members have their own login?",
              answer: "Yes, different staff members can have their own login. This allows each member to manage their own schedule, view their appointments, and handle their customers individually."
            },
            {
              question: "Can I add Appointy to my website or social media handles?",
              answer: "Yes, Appointy can be integrated into your website or social media handles. You can add a 'Book Now' button to your website, Facebook, Instagram, and other social platforms to allow customers to book appointments directly."
            },
            {
              question: "Which data formats are supported during migration from other software systems?",
              answer: "Appointy supports various data formats including CSV, XLSX, and others. Our support team can assist you with the migration process to ensure a smooth transition."
            }
          ].map((faq, index) => (
            <div key={index} className="faq-item" onClick={() => handleToggle(index)}>
              <div className="faq-question">
                {faq.question}
                <BiChevronUp className="question"/>
              </div>
              {activeIndex === index && <div className="faq-answer">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>
      

   
    </Layout>
  );
};

export default HomePage;
