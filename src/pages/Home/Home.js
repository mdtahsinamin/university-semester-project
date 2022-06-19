import { useContext } from 'react';
import { EshopUser } from '../../App';
import Feature from '../../components/Feature/Feature';
import Footer from '../../components/Footer/Footer';
import NewProduct from '../../components/NewProduct/NewProduct';
import Newsletter from '../../components/Newsletter/Newsletter';
import Products from '../../components/Product/Products';
import Slick from '../../components/Slick/Slick';
import useDecodeToken from '../../hooks/useDecodeToken';
import Categories from './../../components/Category/Categories';
import MiddleBar from './../../components/MiddleBar/MiddleBar';
import NavBar from './../../components/NavBar/NavBar';
const Home = () => {
    const [loginUser , setLoginUser] = useContext(EshopUser);
    const newUser = useDecodeToken();
   
    if(newUser){
      loginUser['user'] = {
        ...loginUser['user'],
        ...newUser
      }
      setLoginUser(loginUser);
    }
    
    return (
        <>
           <NavBar></NavBar>
           <MiddleBar></MiddleBar>
           <Slick></Slick>
           <Feature></Feature>
           <div className="mt-5">
             <NewProduct></NewProduct>
           </div>
           <Categories></Categories>
           <Products></Products>
           <Newsletter/>
           <Footer/>
        </>
    );
};

export default Home;
