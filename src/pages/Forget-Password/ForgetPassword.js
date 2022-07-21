import { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Forgot from "../../assets/password (2).png";
import { clearErrors, forgotPassword } from "../../redux/actions/UserActions";
const ForgetPassword = () => {
  const dispatch = useDispatch();

  const alert = useAlert();
  const { error, message, loading } = useSelector((state) => state.forgetPassword);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({});

  const success = (value) => toast.success(value);
  const notify = (value) => toast.error(value);

  const onSubmit = async (data) => {
    const myForm = new FormData();
    myForm.set("email", data.email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      notify(error);
      dispatch(clearErrors());
    }
    if (message) {
      success(message);
    }
  }, [dispatch, error, alert, message]);
  return (
    <Fragment>
      <main className="main auth-container">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="card-wrapper">
              <div className="brand text-center">
                <Link to="/">
                  {" "}
                  <img src={Logo} alt="" />{" "}
                </Link>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 offset-sm-1">
                      <img src={Forgot} alt="Login" className="w-100" />
                    </div>
                    <div className="col-md-5">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <h4 className="welcome-title text-uppercase"> Forgot Password</h4>
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
                        <div className="mb-5 pt-3">
                          <input
                            type="submit"
                            value="Submit"
                            className="submit-form"
                            onClick={handleSubmit(onSubmit)}
                          />
                        </div>
                      </form>
                    </div>
                    <Toaster position="bottom-center" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default ForgetPassword;
