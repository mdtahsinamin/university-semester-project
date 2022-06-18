import { useContext } from 'react';
import { EshopUser } from '../../App';
import Slick from '../../components/Slick/Slick';
import useDecodeToken from '../../hooks/useDecodeToken';
import MiddleBar from './../../components/MiddleBar/MiddleBar';
import NavBar from './../../components/NavBar/NavBar';
import Product from './../../components/Product/Product';

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
           <Product></Product>
        </>
    );
};

export default Home;