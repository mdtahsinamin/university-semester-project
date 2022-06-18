import { useContext } from 'react';
import { EshopUser } from '../../App';

const UserProfile = () => {

    const [loginUser , setLoginUser] = useContext(EshopUser);

    console.log(loginUser);
    return (
        <div>
            <h1>{loginUser.user.name}</h1>
        </div>
    );
};

export default UserProfile;