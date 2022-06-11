import React from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from "react-router-dom";
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import pic3 from './resumelogo.png';
import SearchBar from './components/Home/SearchBar';



function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  }


  return (



    <div className='header'>
      <Link to="/home">
        <img className="header__logo" src={pic3} />
      </Link>

     

      <SearchBar/>


      <div className="header_nav">
        <Link to={!user && "/login"}>
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionOne">
              {!user ? "Guest" : user.email}
            </span>
            <span className="header__optionTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <Link to='/orders'>
          <div className="header__option">
            <span className="header__optionOne">
              Return
            </span>
            <span className="header__optionTwo">
              & Orders
            </span>
          </div>
        </Link>

        <Link to="/checkout">

          <div className='header__optionBasket'>
            <ShoppingBasketIcon />
            <span className='header__optionLineTwo header_basketCount'>
              {basket?.length}
            </span>

          </div>


        </Link>



      </div>



    </div >
  )
}

export default Header