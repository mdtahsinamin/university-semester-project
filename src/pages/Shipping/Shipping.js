import { Country, State } from "country-state-city";
import { Fragment, useState } from "react";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import MetaData from "../../components/MetaData/MetaData";
import { saveShippingInfo } from "../../redux/actions/CartActions";
import CheckoutSteps from "./CheckoutSteps";
import './Shipping.css';
const Shipping = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { shippingInfo } = useSelector((state) => state.cart);

    const [country, setCountry] = useState('')

    const success = () => toast.success('Your Shipping Details was token');
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({});

    const onSubmit = async (data) => {
        dispatch(saveShippingInfo(data))
        success()
        navigate('/shipping-order/confirm',{ replace: true })
    };
    
    return (
        <Fragment>
        <MetaData title="Shipping Details" />
        <CheckoutSteps activeStep={0} />
        <main className="main">
        <div className="register-layout">
        <div className="container-fluid mt-5">
          <div className="row justify-content-md-center">
            <div className="card-wrapper col-12 col-md-4 mt-5">
            <div className="brand text-center mb-3">
                <Link to='/'>
                  <img src={Logo} alt="E-SHOP"/>
                </Link>
             </div>
              <div className="card mb-4">
                <div className="card-body">
                  <div className="form-layout">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <h2 className="create-account">Shipping Details</h2>
                      <div className="formInput">
                        <label htmlFor="address">Address</label>
                        <input
                          type="text"
                          className="form-input"
                          id="address"
                          name="address"
                          autoFocus=""
                          {...register("address", {
                            required: "Address is required",
                            message: "Address is required"
                          })}
                          required
                        />
                      </div>
                      {errors.address && <span className="error-message">{errors.address.message}</span>}
                      <div className="formInput">
                        <label htmlFor="city">City</label>
                        <input
                          id="city"
                          type="text"
                          className="form-input"
                          name="city"
                          {...register("city", {
                            required: "City is required",
                            message: "City is required"
                          })}
                          required
                        />
                      </div>
                      {errors.city && <span className="error-message">{errors.city.message}</span>}

                      <div className="form-row">
                        <div className="formInput col-md-6">
                          <label htmlFor="pinCode">Pin Code</label>
                          <input
                            id="pinCode"
                            type='text'
                            className="form-input"
                            name="pinCode"
                            {...register("pinCode", {
                              required: "Pin Code is required",
                              message: "Pin Code is required"
                            })}
                            required
                          />
                        </div>
                        {errors.pinCode && (
                          <span className="error-message">{errors.pinCode.message}</span>
                        )}

                        <div className="formInput col-md-6">
                          <label htmlFor="phoneNumber">Phone Number</label>
                          <input
                            id="phoneNumber"
                            type='text'
                            className="form-input"
                            name="phoneNumber"
                            {...register("phoneNumber", {
                                required:"Phone is required",
                                pattern: {
                                    value:
                                     /^(?:(?:\+|00)88|01)?\d{11}$/,
                                     message: "Please enter a valid phone number"
                                  }
                            })}
                            required
                          />
                        </div>
                        {errors.phoneNumber && (
                          <span className="error-message">{errors.phoneNumber.message}</span>
                        )}
                      </div>
                      <div className="formInput col-md-6">
                      <label htmlFor="">Country</label>
                      <select {...register("country", { required: true })}     className="form-input"
                       onChange={(e) => setCountry(e.target.value)}
                      >
                         <option value="">Country</option>
                         {Country &&
                          Country.getAllCountries().map((item) => (
                            <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                            </option>
                        ))}
                      </select>
                      </div>

                     {country && <div className="formInput col-md-6">
                      <label htmlFor="">State</label>
                      <select {...register("state", { required: true })}       className="form-input">
                         <option value="">Country</option>
                         {State &&
                          State.getStatesOfCountry(country).map((item) => (
                        <option key={item.isoCode} value={item.name}>
                            {item.name}
                        </option>
                        ))}
                      </select> 
                      </div>}

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
          <Toaster/>
        </div>
      </div>
    </main>
</Fragment>
    );
};

export default Shipping;
