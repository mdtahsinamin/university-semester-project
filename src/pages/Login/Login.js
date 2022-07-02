import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useSignInWithFacebook, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from "../../assets/logo.png";
import AuthPic from "../../assets/undraw_mobile_encryption_re_yw3o.svg";
import useStoreToken from "../../hooks/useStoreToken";
import { clearErrors, login } from "../../redux/actions/UserActions";
import { auth } from "./../../auth/firebase.config";
import "./Login.css";

const Login = () => {
  const [signInWithGoogle, user] = useSignInWithGoogle(auth);
  const [signInWithFacebook, fUser, fError] = useSignInWithFacebook(auth);
  const alert = useAlert();
  const {loading, error,isAuthenticated} = useSelector((state)=> state.user);

  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({});

   const navigate = useNavigate();
   const location = useLocation();
   let from = location.state?.from?.pathname || "/";

  // social login

   const token = useStoreToken(user || fUser);


   const notify = (value) => toast.error(value);
   const success = () => toast.success('login success');

   
  
    // form login or user login  navigate(from, { replace: true });
    const onSubmit = async data => {
      dispatch(login(data.email, data.password));
    };

    useEffect(()=>{
       if(isAuthenticated){
        success()
        navigate(from, { replace: true });
       }
       if(error){
        alert.error(error)
        dispatch(clearErrors())
      }
    },[dispatch,error,isAuthenticated])

  return (
    <main className="main auth-container">
      <div className="container mt-2 pt-1">
        <div className="row justify-content-md-center">
          <div className="card-wrapper">
            <div className="brand text-center mb-3">
             <Link to="/"> <img src={Logo} alt="" /> </Link>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 offset-sm-1">
                    <img src={AuthPic} alt="Login" className="w-50" />
                    <h3 className="text-uppercase mt-3 social-title">
                      Continue with social account
                    </h3>
                    <hr className="style-eight" />
                    <div className="d-grid gap-2 w-50">
                      <button
                        className="btn btn-primary"
                        type="button"
                          onClick={() => {
                          signInWithGoogle();
                        }}>
                        <FcGoogle /> Continue with Google
                      </button>
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => {
                          signInWithFacebook();
                        }}>
                        <FaFacebook /> Continue with Facebook
                      </button>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <h4 className="welcome-title text-uppercase"> Welcome to E-SHOP! 👋</h4>
                      <p className="">Please sign-in to your account</p>

                      <div className="mb-4">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          name="email-username"
                          placeholder="Enter your email"
                          autoFocus
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value:
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: "Please enter a valid email"
                            }
                          })}
                          required
                        />
                      </div>
                      {errors.email && (
                        <span className="error-message">{errors.email.message}</span>
                      )}

                      <div className="mb-4 form-password-toggle">
                        <label className="form-label" htmlFor="password">
                                Password
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="password"
                            id="password"
                            className="form-control"
                            name="password"
                            aria-describedby="password"
                            {...register("password", {
                              required: "You must specify a password",
                              minLength: {
                                value: 8,
                                message: "Password at least 8 characters"
                              }
                            })}
                            required
                          />
                        </div>
                        <div className="d-flex justify-content-between">
                          <Link to='/forget-password'>
                          <small>Forgot Password?</small>
                          </Link>
                        </div>
                        {errors.password && (
                          <span className="error-message">{errors.password.message}</span>
                        )}
                      </div>
                      <div className="mb-5 pt-3">
                         <input 
                          type="submit" 
                          value="submit"
                          className="submit-form"  
                          onClick={handleSubmit(onSubmit)}/>
                        </div>
                    </form>
                  </div>
                  <Toaster
                    position="bottom-center"
                   />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;

/*
fetch('http://localhost:5000/api/v1/auth/user-login',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(getData => {
             console.log(getData);
             sessionStorage.setItem('accessToken', getData.accessToken);
            
        }).catch(error => {
            console.log(error);
        })

*/