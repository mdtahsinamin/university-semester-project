import { Avatar } from "@mui/material";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Loader from "../../components/Loader/Loader";
import "./UserProfile.css";
const UserProfile = () => {
  const { user, loading, error, isAuthenticated } = useSelector((state) => state.user);

  return (
    <Fragment>
        {
           loading ? <Loader/>: <Fragment>
             <div className="profileContainer">
            <div className='mt-3'>
                <div className="logo-section">
                  <Link to="/">
                    <img src={logo} alt="" />
                  </Link>
                </div>
              <h1>My Profile</h1>
              <Avatar
                className="img"
                alt="Remy Sharp"
                src={user.picture.url}
                sx={{ width: 300, height: 300 }}
                />
              <Link to="/update/profile">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/my-order">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
          </Fragment>
        }
    </Fragment>
  );
};

export default UserProfile;