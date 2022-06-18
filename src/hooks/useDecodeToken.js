import jwt_decode from "jwt-decode";
const useDecodeToken = () => {
     const accessToken = sessionStorage.getItem('accessToken');

     if(!accessToken){
        return false;
     }

     const decodedToken = jwt_decode(accessToken);

     const newUser = {
         name: decodedToken.name,
         email : decodedToken.email,
         picture : decodedToken.picture,
     }

     return newUser;


};

export default useDecodeToken;