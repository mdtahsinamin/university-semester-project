
const useAvailable = () => {
      const token = sessionStorage.getItem('accessToken');
        if(!token){
          return false;
        }
       const decodedToken = jwt_decode(token);

       const currentTime = new Date().getTime() / 1000;

       const isValid = decodedToken.exp > currentTime

       if(!isValid){
         sessionStorage.removeItem('accessToken')
       }
       return (isValid);
};

export default useAvailable;