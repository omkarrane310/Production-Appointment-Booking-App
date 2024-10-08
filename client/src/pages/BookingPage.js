import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, message, TimePicker, Rate, Input } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

import '../styles/FeedbackSection.css'; // Import custom CSS for the feedback section

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState({});
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const dispatch = useDispatch();

  // Fetch doctor data and feedback
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
        setFeedbackList(res.data.data.ratings || []); // Fetch feedback from ratings array
        calculateAverageRating(res.data.data.ratings || []); // Calculate average rating
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Calculate average rating
  const calculateAverageRating = (ratings) => {
    if (ratings.length > 0) {
      const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
      const average = totalRating / ratings.length;
      setAverageRating(average);
    } else {
      setAverageRating(0);
    }
  };

  // Handle availability check
  const handleAvailability = async (e) => {
    e.preventDefault();

    if (!date || !time) {
      return message.error("Please enter both date and time");
    }

    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availability",
        { doctorId: params.doctorId, date: date.format("DD-MM-YYYY"), time: time.format("HH:mm") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  // Handle booking
  const handleBooking = async () => {
    if (!date || !time) {
      return alert("Date & Time Required");
    }
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date.format("DD-MM-YYYY"),
          time: time.format("HH:mm"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  // Handle feedback submission
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedback || rating === 0) {
      return message.error("Rating and feedback are required");
    }
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/submitFeedback",
        {
          doctorId: params.doctorId,
          userName: user.name,
          rating,
          feedback,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Feedback submitted successfully");
        setFeedback("");
        setRating(0);
        getUserData(); // Refresh feedback list
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h3 className="book-h3">Booking Page</h3>
      <div className="booking-container">
        {doctors && (
          <div className="details">
            <h2>Profession: {doctors.specialization}</h2>
            <h4>Name: {doctors.firstName} {doctors.lastName}</h4>
            <h4>Fees: {doctors.feesPerCunsaltation}</h4>
            <h4>Timings: {doctors.timings && doctors.timings[0]} - {doctors.timings && doctors.timings[1]}</h4>
            <h4>Address: {doctors.address}</h4>
          </div>
        )}

        <DatePicker
          className="m-2"
          format="DD-MM-YYYY"
          value={date}
          onChange={(value) => setDate(value)}
        />
        <TimePicker
          format="HH:mm"
          className="mt-3"
          value={time}
          onChange={(value) => setTime(value)}
        />

        <div className="buttons">
          <button className="btn btn-primary" onClick={handleAvailability}>
            Check Availability
          </button>
          <button className="btn btn-dark" onClick={handleBooking}>
            Book Now
          </button>
        </div>

        <div className="feedback-sec">
          <h3>Leave a Feedback</h3>
          <Rate onChange={(value) => setRating(value)} value={rating} />
          <Input.TextArea
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your feedback here"
          />
          <button className="btn btn-dark mt-2" onClick={handleFeedbackSubmit}>
            Submit Feedback
          </button>
        </div>

        <div className="average-rating">
          <h4>Average Rating: {averageRating.toFixed(1)} / 5</h4>
          <p>({feedbackList.length} feedbacks)</p>
        </div>

        <div className="feedback-list">
          {feedbackList && feedbackList.length > 0 ? (
            feedbackList.map((fb, index) => (
              <div key={index} className="feedback-item">
                <p><strong>{fb.userName}:</strong></p>
                <Rate disabled value={fb.rating} />
                <p>{fb.feedback}</p>
              </div>
            ))
          ) : (
            <p>No feedback yet</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
