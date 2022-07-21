import { Fragment } from "react";
import { useSelector } from "react-redux";
import MetaData from "../../components/MetaData/MetaData";
import "./ConfirmOrder.css";
//import { Link } from "react-router-dom";
//import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import CheckoutSteps from "../../pages/Shipping/CheckoutSteps";
const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment", { replace: true });
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <NavBar />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea mt-4">
            <h3>Shipping Info:</h3>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNumber}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <h3>Your Cart Items:</h3>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product-details/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} X ৳ {item.price} = <b>৳ {item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <h3>Order Summery:</h3>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>৳ {subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>৳ {shippingCharges}</span>
              </div>
              <div>
                <p>TAX:</p>
                <span>৳ {tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>৳ {totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
