
import { Typography } from "@mui/material";
import axios from "axios";
import {
  ArcElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title,
  Tooltip
} from 'chart.js';
import { useEffect, useMemo, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import { getAllOrders } from "../../redux/actions/OrderAction";
import { getAdminProduct } from "../../redux/actions/ProductActions";
import { getAllUsers } from "../../redux/actions/UserActions";
import Chart from "./Chart";
import "./DashBoard.css";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashBoard = () => {
  const dispatch = useDispatch();
  const [userStats, setUserStats] = useState([]);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock <= 0) {
        outOfStock += 1;
      }
    });

    let totalAmount = 0;
    orders &&
      orders.forEach((item) => {
        totalAmount += item.totalPrice;
      })


  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["#1c7ed6"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };


  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());

    const getStats = async () => {
      try {
        const res = await axios.get("https://e-shop-47.herokuapp.com/api/v1/auth/stats");
         res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch {}
    };
    getStats();
    
  }, [dispatch, MONTHS]);

    return (
        <div className="dashboard">
        <SideBar />
        <div className="dashboardContainer">
          <Typography component="h1">Dashboard</Typography>
  
          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br /> ৳ {totalAmount}
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <h4>Product</h4>
                <h5>{products && products.length}</h5>
             </Link>
             
                 <Link to='/admin/orders'>
                    <h4 className='text-dark'>Orders</h4>
                    <h5 className='text-dark'>{orders && orders.length}</h5>
                 </Link>

                 <Link to='/admin/users'>
                  <h4 className='text-white'>Users</h4>
                  <h5 className='text-white'>{users && users.length}</h5>
                 </Link>
            
            </div>
          </div>
  
          <div className="lineChart">
             <Line data={lineState} />
          </div>
  
          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
          <div className="lineChart">
          <Chart
            data={userStats}
            title="User Analytics"
            grid
            dataKey="Active User"
            />
          </div>
        </div>
      </div>
    );
};

export default DashBoard;