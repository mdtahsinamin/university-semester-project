import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {
  CardCvcElement,
  CardExpiryElement, CardNumberElement, useElements, useStripe
} from "@stripe/react-stripe-js";
import axios from 'axios';
import { Fragment, useEffect, useRef } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../../components/MetaData/MetaData";
import { clearErrors, createOrder } from '../../redux/actions/OrderAction';
import CheckoutSteps from "../Shipping/CheckoutSteps";
import './Payment.css';


const Payment = () => {

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const dispatch = useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const navigate = useNavigate();

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

   const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
    };

     const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
      };

      const submitHandler = async (e) => {
        e.preventDefault();
    
        payBtn.current.disabled = true;
    
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const { data } = await axios.post(
            "/api/v1/payment/process",
            paymentData,
            config
          );
    
          const client_secret = data.client_secret;
    
          if (!stripe || !elements) return;
    
          const result = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
              card: elements.getElement(CardNumberElement),
              billing_details: {
                name: user.name,
                email: user.email,
                address: {
                  line1: shippingInfo.address,
                  city: shippingInfo.city,
                  state: shippingInfo.state,
                  postal_code: shippingInfo.pinCode,
                  country: shippingInfo.country,
                },
              },
            },
          });
    
          if (result.error) {
            payBtn.current.disabled = false;
    
            alert.error(result.error.message);
          } else {
            if (result.paymentIntent.status === "succeeded") {
              order.paymentInfo = {
                id: result.paymentIntent.id,
                status: result.paymentIntent.status,
              };
    
              dispatch(createOrder(order));
              navigate("/success");
            } else {
              alert.error("There's some issue while processing payment ");
            }
          }
        } catch (error) {
          payBtn.current.disabled = false;
          alert.error(error.response.data.message);
        }
      };

      useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        
      }, [dispatch,error,alert]);
    
    return (
        <Fragment>
            <MetaData title="Shipping Details" />
            <CheckoutSteps activeStep={2} />
            <div className="paymentContainer">
            <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
            <h2 className="text-center">Card Information</h2>
            <div>
                <CreditCardIcon />
                <CardNumberElement className="paymentInput" />
            </div>
            <div>
                <EventIcon />
                <CardExpiryElement className="paymentInput" />
            </div>
            <div>
                <VpnKeyIcon />
                <CardCvcElement className="paymentInput" />
            </div>

            <input
                type="submit"
                value={`Pay - ৳ ${orderInfo && orderInfo.totalPrice}`}
                ref={payBtn}
                className="paymentFormBtn"
            />
            </form>
        </div>
        </Fragment>
    );
};

export default Payment;