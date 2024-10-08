import React, { useState } from "react";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "./../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";
import '../styles/new.css';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  // Doctor menu
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
    {
      name: "Professionals",
      path: "/professionals",
      icon: "fa-solid fa-briefcase",
    },
  ];

  // Rendering menu list
  const SidebarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6 className="text-light">Appointment Booking Website</h6>
              <hr />
            </div>

            {/* Sidebar Menu */}
            <div className={`${isMenuOpen ? "open" : ""} menu`}>
              {SidebarMenu.map((menu, index) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div key={index} className={`menu-item ${isActive && "active"}`}>
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}

              <div className="menu-item" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>

            {/* Mobile Menu Toggle (Hamburger/Close Icon) */}
            <div className="mob-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {!isMenuOpen ? (
                <>
                  <span></span>
                  <span></span>
                  <span></span>
                </>
              ) : (
                <i className="fa-solid fa-times"></i> // Cross icon when the menu is open
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge
                  count={user && user.notification?.length}
                  onClick={() => {
                    navigate("/notification");
                  }}
                >
                  <i className="fa-solid fa-bell"></i>
                </Badge>
                {user?.isDoctor && (
                  <Link to={`/doctor/profile/${user?._id}`}>
                    {user?.name}
                  </Link>
                )}
              </div>
            </div>

            {/* Page Body */}
            <div className="body">{children}</div>

            {/* Footer */}
            <div className="footer">
              <div className="footer-content">
                <h4>Appointy.com</h4>
                <p>Contact us: <a href="mailto:support@appointy.com">support@appointy.com</a></p>
                <form>
                  <input type="email" id="contactEmail" name="contactEmail" placeholder="Your email.." />
                  <input type="submit" value="Submit" />
                </form>
              </div>
              <p className="p">&copy; All Rights Reserved || 2024-25</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
