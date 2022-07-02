import { Avatar } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import MetaData from "../../components/MetaData/MetaData";
import { clearErrors, loadUser, updateProfile } from "../../redux/actions/UserActions";
import { UPDATE_PROFILE_RESET } from "../../redux/constants/UserConstants";

const UpdateProfile = () => {
    
    const [fileName , setFileName] = useState('Upload image');
    const [file ,setFile] = useState('');
    const [preview, setPreview] = useState()

    const alert = useAlert();

    const success = () => toast.success('login success');

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const {error, isUpdated, loading } = useSelector((state)=> state.profile);
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({});
     const navigate = useNavigate();

     const onChange = async (event) =>{

        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
    }


    const onSubmit = async (data) => {
        const myForm = new FormData();
        myForm.set('name', data.name);
        myForm.set('email',data.email);
        myForm.set('picture',file);
        
       //dispatch(updateProfile(myForm))

       toast.promise(dispatch(updateProfile(myForm)), {
        loading: 'Loading',
        success: 'Profile Updated Successfully',
        error: 'Error when fetching',
        });
      };

      useEffect(()=>{
        if (!file) {
            setPreview(undefined)
            return
        }
        const objectUrl =URL.createObjectURL(file);
        setPreview(objectUrl);
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
          }
      
          if (isUpdated) {
           // alert.success("Profile Updated Successfully");
            dispatch(loadUser());
      
            navigate("/user-profile");
      
            dispatch({
              type: UPDATE_PROFILE_RESET,
            });
          }
          return () => URL.revokeObjectURL(objectUrl)
      },[dispatch, error, alert, navigate, isUpdated,file])


    return (
   <Fragment>
    <MetaData title="Update Profile"/> 
    <main className="main">
      <div className="register-layout">
        <div className="container-fluid pb-5">
          <div className="row justify-content-md-center">
            <div className="card-wrapper col-12 col-md-4 mt-5">
              <div className="brand text-center mb-3">
                <Link to='/'>
                  <img src={Logo} alt="E-SHOP"/>
                </Link>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="form-layout">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <h2 className="create-account">Update Profile</h2>
                      <div className="formInput">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"  
                          className="form-input"
                          id="name"
                          name="name"
                          defaultValue={user.name}
                          autoFocus=""
                          {...register("name", {
                            minLength: {
                              value: 3,
                              message: "Name must have at least 3 characters"
                            }
                          })}
                          required
                        />
                      </div>
                      {errors.name && <span className="error-message">{errors.name.message}</span>}
                      <div className="formInput">
                        <label htmlFor="email">E-Mail Address</label>
                        <input
                          id="email"
                          type="email"
                          className="form-input"
                          defaultValue={user.email}
                          name="email"
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
                      {errors.email && <span className="error-message">{errors.email.message}</span>}

                      <label htmlFor="formFile">Profile Picture</label>
                      <div className="formInput col-md-6" id='registerImage'>
                       <br />
                       <input 
                        type="file" 
                        name="image" 
                        id="file" 
                        {...register("image")}
                        onChange={onChange}
                        required/>
                        <label htmlFor="formFile">
                          <span>{fileName}</span>
                        </label>
                        <div className='d-flex justify-content-center'>
                         {
                            !file ? <Avatar alt="Remy Sharp" src="/Tahsin"/>:
                            <Avatar alt="Remy Sharp" src={preview} sx={{ width: 56, height: 56 }}/>
                         }
                        </div>
                      </div>
                      <div className="d-flex justify-content-center mt-2">
                        <input
                          type="submit"
                          value="Submit"
                          className="submit-form"
                          onClick={handleSubmit(onSubmit)}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-center"/>
    </main>
   </Fragment>
    );
};

export default UpdateProfile;