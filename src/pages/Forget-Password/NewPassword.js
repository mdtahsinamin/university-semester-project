import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import password from "../../assets/Authentication.png";
import Logo from "../../assets/logo.png";
import { clearErrors, resetPassword } from "../../redux/actions/UserActions";
const NewPassword = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState(false);
  const [confPassword, setConfPassword] = useState(false);
  const alert = useAlert();

  const navigate = useNavigate();

  const successfully = (value) => toast.success(value);
  const notify = (value) => toast.error(value);

  const { error, success, loading } = useSelector((state) => state.forgetPassword);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({});

  const onSubmit = async (data) => {
    console.log(data);
    const myForm = new FormData();
    myForm.set("password", data.password);
    myForm.set("confirmPassword", data.confirmPassword);
    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      notify(error);
      dispatch(clearErrors());
    }
    if (success) {
      successfully(`Password Updated Successfully`);
      navigate("/login");
    }
  }, [dispatch, error, success, navigate]);
  return (
    <Fragment>
      <main className="main auth-container">
        <div className="container mt-2 pt-1">
          <div className="row justify-content-md-center">
            <div className="card-wrapper">
              <div className="brand text-center mb-3">
                <Link to="/">
                  {" "}
                  <img src={Logo} alt="" />{" "}
                </Link>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <img src={password} alt="Login" className="w-75" />
                    </div>
                    <div className="col-md-6">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <h4 className="welcome-title text-uppercase"> New Password</h4>
                        <div className="mb-4 form-password-toggle">
                          <label className="form-label" htmlFor="password">
                            New Password
                          </label>
                          <div className="input-group input-group-merge">
                            <input
                              type={newPassword ? "text" : "password"}
                              id="newPassword"
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

                          {newPassword ? (
                            <span
                              className="new-icon"
                              onClick={() => {
                                setNewPassword(!newPassword);
                              }}>
                              <VisibilityOffIcon />
                            </span>
                          ) : (
                            <span
                              className="new-icon"
                              onClick={() => {
                                setNewPassword(!newPassword);
                              }}>
                              <VisibilityIcon />
                            </span>
                          )}
                        </div>
                        {errors.newPassword && (
                          <span className="error-message">{errors.newPassword.message}</span>
                        )}

                        <div className="mb-4 form-password-toggle">
                          <label className="form-label" htmlFor="password">
                            Confirm Password
                          </label>
                          <div className="input-group input-group-merge">
                            <input
                              type={confPassword ? "text" : "password"}
                              id="confirmPassword"
                              className="form-control"
                              name="confirmPassword"
                              aria-describedby="password"
                              {...register("confirmPassword", {
                                required: "You must specify a password",
                                minLength: {
                                  value: 8,
                                  message: "Password at least 8 characters"
                                }
                              })}
                              required
                            />
                          </div>
                          {confPassword ? (
                            <span
                              className="conf-icon"
                              onClick={() => {
                                setConfPassword(!confPassword);
                              }}>
                              <VisibilityOffIcon />
                            </span>
                          ) : (
                            <span
                              className="conf-icon"
                              onClick={() => {
                                setConfPassword(!confPassword);
                              }}>
                              <VisibilityIcon />
                            </span>
                          )}
                        </div>

                        <div>
                          {errors.confirmPassword && (
                            <span className="error-message">{errors.confirmPassword.message}</span>
                          )}
                        </div>

                        <div className="mb-5 pt-3">
                          <input
                            type="submit"
                            value="New Password"
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

export default NewPassword;
