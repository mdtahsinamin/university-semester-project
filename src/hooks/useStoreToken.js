
const useStoreToken = (user) => {
    
    if(!user){
        return false;
    }

    sessionStorage.setItem('accessToken' , user.user?.accessToken);

    if(!sessionStorage.getItem('accessToken')){
       return false;
    }

    return true;

}

export default useStoreToken;