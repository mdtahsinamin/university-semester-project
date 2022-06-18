import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { useSignInWithFacebook, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from "./../../auth/firebase.config";
import "./Login.css";

import AuthPic from "../../assets/undraw_mobile_encryption_re_yw3o.svg";

import { useEffect } from "react";
import Logo from "../../assets/logo.png";
import useStoreToken from "../../hooks/useStoreToken";

const Login = () => {
  const [signInWithGoogle, user] = useSignInWithGoogle(auth);
  const [signInWithFacebook, fUser, fError] = useSignInWithFacebook(auth);

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

    useEffect( async ()=>{
      try {
          if(token){
             navigate(from, { replace: true });
          }
      } catch (error) {
          console.log(error);
      }

    },[user , fUser, token, from, navigate])


    // form login or user login
    const onSubmit = async data => {
        fetch('http://localhost:5000/api/v1/user-login',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(getData => {
             sessionStorage.setItem('accessToken', getData.accessToken);
             navigate(from, { replace: true });
        }).catch(error => {
            console.log(error);
        })
    };

  return (
    <main className="main auth-container">
      <div className="container mt-2 pt-1">
        <div className="row justify-content-md-center">
          <div className="card-wrapper">
            <div className="brand text-center mb-3">
              <img src={Logo} alt="" />
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

 <div className="container-xxl">
            <div className="authentication-wrapper authentication-basic container-p-y">
                <div className="authentication-inner">
                
                <div className="card">
                    <div className="card-body">
                    
                    <div className="app-brand justify-content-center">
                       
                    </div>
                    <h4 className="mb-2">Welcome to E-SHOP! 👋</h4>
                    <p className="mb-4">Please sign-in to your account and start the adventure</p>

                    <form onSubmit={e => e.preventDefault()}>
                        <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email or Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            name="email-username"
                            placeholder="Enter your email or username"
                            autoFocus
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Please enter a valid email',
                                },
                            })}
                        required/>
                        </div>
                        {errors.email && <p className='error-message'>{errors.email.message}</p>}
                        <div className="mb-3 form-password-toggle">
                        <div className="d-flex justify-content-between">
                            <label className="form-label" htmlFor="password">Password</label>
                            <small>Forgot Password?</small>
                        </div>
                        <div className="input-group input-group-merge">
                            <input
                            type="password"
                            id="password"
                            className="form-control"
                            name="password"
                            aria-describedby="password"

                            {...register('password',{
                                required: "You must specify a password",
                                minLength: {
                                  value: 8,
                                  message: "Password must have at least 8 characters"
                                }
                              })}

                           required />
                          
                        </div>
                        {errors.password && <p className='error-message'>{errors.password.message}</p>}
                        </div>
                        <div className="mb-3">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="remember-me" />
                            <label className="form-check-label" htmlFor="remember-me"> Remember Me </label>
                        </div>
                        </div>
                        <div className="mb-3">
                         <input type="submit" value="submit"  onClick={handleSubmit(onSubmit)}/>
                        </div>
                    </form>

                    <p className="text-center">
                        <span>New on our platform?</span>
                        <Link to = '/register'>
                          <span>Create an account</span>
                        </Link>
                    </p>
                        
                    </div>

                    <div className="d-grid gap-2 mx-auto mb-3">
                        <button className="btn btn-primary"  type="button" onClick={()=>{
                            signInWithGoogle()
                        }}>
                            <FcGoogle/> Continue with Google
                        </button>
                        <button className="btn btn-primary" type="button" onClick={()=>{
                            signInWithFacebook()
                        }}>
                            <FaFacebook/> Continue with Facebook
                        </button>
                    </div>
                    
                </div>
                
                </div>
            </div>
            </div>


*/