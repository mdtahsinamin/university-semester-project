import { useContext } from 'react';
import { Button, Dropdown, DropdownButton, Form, FormControl } from 'react-bootstrap';
import { FaCarSide, FaOpencart, FaRegistered, FaUserAlt } from "react-icons/fa";
import { FiHeart, FiLogOut } from "react-icons/fi";
import { IoIosLogIn, IoMdCall } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import TopBar from "../TopBar/TopBar";
import { EshopUser } from './../../App';
import useAvailable from './../../hooks/useAvailable';
import "./NavBar.css";
const NavBar = () => {
  /* const { register, handleSubmit} = useForm();
    const onSubmit = data => console.log(data);*/

    const [loginUser , setLoginUser] = useContext(EshopUser)

    console.log(loginUser);

    const available =  useAvailable();


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
                <Link to="/login">
                  {available  ? <li>
                    <FiLogOut className="icons" /> Logout
                  </li> : <li>
                    <IoIosLogIn className="icons" /> Login
                  </li>}
                </Link>
                <Link to="/register">
                  {!available && <li>
                    <FaRegistered className="icons" /> Register
                  </li>}
                </Link>
              </ul>
            </div>
          </div>
        </div>
        <div className="middle-inner">
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-md-3 col-12 mr-1">
                <Link to ='/'>
                 <img src={Logo} alt="E-shop" />
                </Link>
              </div>
              <div className="col-lg-6 col-md-7 col-12">
                <div className="search-box">
                <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-12">
                <div className="right-bar d-flex justify-content-between mt-1">
                  <div className="single-bar">
                    <Link to="/watch-list">
                      <FiHeart className="icons"/>
                    </Link>
                  </div> 
                   <div className="single-bar shopping">
                    <Link to='/cart'> <FaOpencart /></Link>
                   </div>

                  <div className="single-bar">
                  <Dropdown>
                  <DropdownButton
                    id="dropdown-button-dark-example2"
                    menuVariant="dark"
                    variant='light'
                    bg='light'
                    title={ <FaUserAlt className="icons" />}
                    autoClose=''
                    >
                      <div className="container user-profile bg-dark">
                           <div className="img-contain">
                             {loginUser.user?.picture  && <img src={loginUser.user?.picture} alt={loginUser.user?.picture} className= 'rounded-circle'/> 
                             }
                           </div>
                      </div> 

                    <div className="text-center">
                      {loginUser.user?.name &&  <p className='text-white user-name'>{loginUser.user?.name}</p>}
                    </div>
                    <div className="view-profile offset-sm-1">
                    {loginUser.user && <Link to='/user-profile'>
                          <button className="btn btn-rounded text-white view-btn">View  Profile</button>  
                         </Link>
                    }
                    </div>
                  </DropdownButton>
                  </Dropdown>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;