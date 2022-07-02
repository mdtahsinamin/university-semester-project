import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import PostAddIcon from '@mui/icons-material/PostAdd';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { TreeItem, TreeView } from '@mui/lab';
import { Fragment } from 'react';
import { Link } from "react-router-dom";
import Logo from '../../assets/logo.png';
import './SiderBar.css';
const SideBar = () => {
    return (
        <Fragment>
            <div className="content-1">
            <div className="sidebar">
            <Link to="/">
             <img src={Logo} alt="Ecommerce" />
          </Link>
          <Link to="/admin/dashboard">
            <p>
            <DashboardIcon /> Dashboard
          </p>
          </Link>
          
       
          <div className="link">
            <TreeView
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ImportExportIcon />}
            >
              <TreeItem nodeId="1" label="Products">
              <Link to="/admin/products"> 
                <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
              </Link>
                
              <Link to="/admin/product">  
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
              </Link>
              </TreeItem>
            </TreeView>
          </div>
    
          <Link to="/admin/orders"><p>
            <ListAltIcon />
            Orders
          </p></Link>
          
   
          <Link to="/admin/users"> <p>
            <PeopleIcon /> Users
          </p></Link>
         
  
          <Link to="/admin/reviews"><p>
            <RateReviewIcon />
            Reviews
          </p></Link>
          
      </div>
            </div>
        </Fragment>
    );
};

export default SideBar;