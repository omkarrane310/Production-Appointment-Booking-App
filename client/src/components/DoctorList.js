import React from "react";
import { useNavigate } from "react-router-dom";
import { Rate } from "antd";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();

  // Calculate average rating if ratings are available
  const calculateAverageRating = (ratings) => {
    if (ratings && ratings.length > 0) {
      const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
      return totalRating / ratings.length;
    }
    return 0;
  };

  // Get average rating from doctor's ratings
  const averageRating = calculateAverageRating(doctor.ratings);

  return (
    <>
      <div
        className="card m-2 home-card"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
      >
        <div className="card-header">
          <p>{doctor.firstName} {doctor.lastName}</p>
            {/* Display average rating */}
            {/* <p>
            <b>Average Rating:</b> {averageRating.toFixed(1)} / 5
          </p> */}
          <Rate disabled value={averageRating} className="rating" />
        </div>
        <div className="card-body">
          <p>
            <b>Specialization</b> {doctor.specialization}
          </p>
          <p>
            <b>Experience</b> {doctor.experience} years
          </p>
          <p>
            <b>Address</b> {doctor.address}
          </p>
          <p>
            <b>Fees Per Consultation</b> {doctor.feesPerCunsaltation}
          </p>
          <p>
            <b>Timings</b> {doctor.timings[0]} - {doctor.timings[1]}
          </p>
        
        </div>
      </div>
    </>
  );
};

export default DoctorList;
