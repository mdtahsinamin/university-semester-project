import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Badge } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useState } from 'react';
import { Form } from "react-bootstrap";
import toast, { Toaster } from 'react-hot-toast';
import { FaCarSide, FaRegistered } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoIosLogIn, IoMdCall } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { logout } from "../../redux/actions/UserActions";
import TopBar from "../TopBar/TopBar";
import useAvailable from "./../../hooks/useAvailable";
import "./NavBar.css";
const NavBar = () => {
  const {user, loading, error, isAuthenticated } = useSelector((state) => state.user);
  
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const {cartItems} = useSelector((state)=> state.cart);

  const notify = (value) => toast.error(value);
  const success = () => toast.success('login success');

  const handleLogout = () => {
    dispatch(logout())
    localStorage.clear();
    if(error){
      notify(error);
    }
    else{
      success();
      navigate("/");
    }
  };

  const available = useAvailable();
  console.log(available);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
     <TopBar></TopBar>
      <div className="header-bot">
        <div className="header-bot-inner-withThreeInfo-header-mid container-fluid">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-10 section-header">
              <ul className="list">
                <Link to="/shop-location">
                  <li>
                    <MdLocationPin className="icons" /> Shop Location
                  </li>
                </Link>
                <Link to="/track-order">
                  <li>
                    <FaCarSide className="icons" /> Track Order
                  </li>
                </Link>
                <li>
                  <IoMdCall className="icons" /> 01780256961
                </li>
                {isAuthenticated ? (
                  <li type="button" onClick={handleLogout}>
                    <FiLogOut className="icons" /> Logout
                  </li>
                ) : (
                  <Link to="/login">
                    <li>
                      <IoIosLogIn className="icons" /> Login
                    </li>
                  </Link>
                )}

                <Link to="/register">
                  {!isAuthenticated && (
                    <li>
                      <FaRegistered className="icons" /> Register
                    </li>
                  )}
                </Link>
              </ul>
            </div>
          </div>
        </div>
        <div className="middle-inner">
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-md-3 col-12 mr-1">
                <Link to="/">
                  <img src={Logo} alt="E-shop" />
                </Link>
              </div>
              <div className="col-lg-6 col-md-7 col-12">
                <div className="search-box">
                  <Form className="d-flex"></Form>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-12">
                <div className="right-bar d-flex justify-content-between mt-1">
                  <div className="single-bar">
                    <Link to="/watch-list">
                      <Badge badgeContent={4} color="secondary">
                          <FavoriteBorderIcon color="action" sx={{width: 30, height: 40}} />
                       </Badge>
                    </Link>
                  </div>
                  <div className="single-bar shopping">
                    <Link to="/cart">
                      <Badge badgeContent={cartItems.length} color="secondary">
                        <AddShoppingCartIcon color="action" sx={{width: 30, height: 40}}/>
                      </Badge>
                    </Link>
                  </div>

                  <div className="single-bar">
                    <Box sx={{ flexGrow: 0 }}>
                      <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {isAuthenticated && <Avatar alt="Remy Sharp" src={user.picture.url}/>}
                        </IconButton>
                      </Tooltip>
                      <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right"
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right"
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}>
                        <MenuItem  onClick={handleCloseUserMenu}>
                           {(isAuthenticated && user.role==='admin') && <Link to='/admin/dashboard'>
                            <Typography textAlign="center">Dashboard</Typography>
                            </Link>
                           }
                        </MenuItem>
                        <MenuItem  onClick={handleCloseUserMenu}>
                           {isAuthenticated && <Link to='/user-profile'>
                            <Typography textAlign="center">Account</Typography>
                            </Link>
                           }
                        </MenuItem>
                        <MenuItem  onClick={handleCloseUserMenu}>
                           {isAuthenticated && <Link to='/my-orders'>
                            <Typography textAlign="center">Order</Typography>
                            </Link>
                           }
                        </MenuItem>
                        <MenuItem  onClick={handleCloseUserMenu}>
                           {isAuthenticated && <Typography 
                           textAlign="center"
                           onClick={handleLogout}
                           >Logout</Typography>
                           }
                        </MenuItem>
                      </Menu>
                    </Box>
                  </div>
                </div>
              </div>
              <Toaster
              position="bottom-center"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;

