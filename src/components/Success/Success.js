import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { myOrders } from '../../redux/actions/OrderAction';
import './Success.css';
const Success = () => {
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const dispatch = useDispatch()
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  const createAndDownloadPdf = async () =>{
     await axios.post('/create-pdf',orders,)
    .then(() => axios.get('/fetch-pdf',{ responseType: 'blob' }))
    .then((res) => {
      const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
      saveAs(pdfBlob, 'newPdf.pdf');
    })
  }
    return (
    <div className="orderSuccess">
      <CheckCircleIcon />
      <h2>Your Order has been Placed successfully </h2>
      <Link to="/my-orders">View Orders</Link>
      {
      ( !loading && orders.length !==0) && <button 
       className="btn btn-primary"
       onClick={createAndDownloadPdf}
       >Download PDF</button>
      }
      <h2 className ='text-center'>It Take Time.... Please Wait</h2>
    </div>
    );
};

export default Success;