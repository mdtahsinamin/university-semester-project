import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { EshopUser } from '../../App';
import logo from '../../assets/logo.png';
import './UserProfile.css';
const UserProfile = () => {

    const [loginUser , setLoginUser] = useContext(EshopUser);

    console.log(loginUser);
    return (
        <>
        <div className='profile-content'>
            <div className = 'd-flex justify-content-center align-content-center mb-3'>
                <div>
                   <Link to='/'>
                     <img src={logo} alt="" />  
                   </Link>
                </div>
                <div></div>
            </div>
            <div className ='container offset profile-container'>
             <h2 className='text-center'>My Profile</h2>
             <div className='d-flex justify-content-center'>
                 <div className =''>
                     {
                        loginUser.user?.picture ? <img src={loginUser.user.picture} className='rounded-circle' /> : <button className='btn btn-primary'>Upload Profile Pic</button> 
                     }
                 </div>
                 <div>
                 </div>
             </div>
              <div className ='text-center mt-3'>
                 <h3>Name : {loginUser.user.name}</h3>
                 <h3>Email : {loginUser.user.email}</h3>
              </div>
              
              <div className ='d-flex justify-content-center mt-2'>
                <div>
                    <button className='btn btn-primary'>Edit</button>
                </div>
              <div></div>
             </div>
              
        </div>
        </div>
        </>
    );
};

export default UserProfile;
