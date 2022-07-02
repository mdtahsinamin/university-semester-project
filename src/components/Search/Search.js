
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';
const Search = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const searchSubmitHandler = (e) =>{
      e.preventDefault();

      if(keyword.trim()){
        navigate(`/product/${keyword}`);
      }
      else{
        navigate(`/all-products`);
      }

    }
    return (
        <Fragment>
            <form className='searchBox' onSubmit={searchSubmitHandler}>
               <input 
                type="text" 
                placeholder="Search a Product"
                onChange={(e)=>{
                    setKeyword(e.target.value);
                }}
               />
               <input type="submit" value="Submit" />
            </form>
        </Fragment>
    );
};

export default Search;