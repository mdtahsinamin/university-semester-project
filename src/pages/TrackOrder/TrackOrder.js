import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import track from "../../assets/undraw_order_a_car_-3-tww.svg";
const TrackOrder = () => {
  return (
    <div className="container offset-sm-1">
      <Link to="/">
        <img src={logo} alt="" className="mt-4" />
      </Link>
      <h1 className="text-center">Track your order</h1>
      <div className="row">
        <div className="col-md-5 offset-sm-1">
          <img src={track} alt="" className="w-100" />
        </div>
        <div className="col-md-5 offset-sm-1">
          <p>Click Me</p>
          <button className="submit-form">Message</button>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
