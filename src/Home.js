import React, { useState, useEffect } from 'react'
import "./Home.css";
import './Header.css';
import pic1 from './resume1.jpg';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from "react-router-dom";
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import pic3 from './resumelogo.png';
import { motion } from 'framer-motion';
import FilterPanel from './components/Home/FilterPanel';
import SearchBar from './components/Home/SearchBar';
import { dataList } from './constants';
import List from './components/Home/List';
import EmptyView from './components/common/EmptyView';



function Home() {

  const [{ basket, user }, dispatch] = useStateValue();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([50, 1500]);
  const [list, setList] = useState(dataList);
  const [inputSearch, setInputSearch] = useState("");
  const [resultsFound, setResultsFound] = useState(true);


  const [cuisines, setCuisines] = useState([
    { id: 1, checked: false, label: 'Bamboo' },
    { id: 2, checked: false, label: 'Bags' },
    { id: 3, checked: false, label: 'Cups' },
    { id: 4, checked: false, label: 'Recycled' },
    { id: 5, checked: false, label: 'Crafts' },
    { id: 6, checked: false, label: 'Chair' },


  ]);



  const handleSelectCategory = (event, value) =>
    !value ? null : setSelectedCategory(value);

  const handleSelectRating = (event, value) =>
    !value ? null : setSelectedRating(value);

  const handleChangePrice = (event, value) => {
    setSelectedPrice(value);
  };


  const handleChangeChecked = (id) => {
    const cusinesStateList = cuisines;
    const changeCheckedCuisines = cusinesStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setCuisines(changeCheckedCuisines);
  };




  const applyFilters = () => {
    let updatedList = dataList;

    // Rating Filter
    if (selectedRating) {
      updatedList = updatedList.filter(
        (item) => parseInt(item.rating) === parseInt(selectedRating)
      );
    }

    // Category Filter
    if (selectedCategory) {
      updatedList = updatedList.filter(
        (item) => item.category === selectedCategory
      );
    }

    // Cuisine Filter
    const cuisinesChecked = cuisines
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (cuisinesChecked.length) {
      updatedList = updatedList.filter((item) =>
        cuisinesChecked.includes(item.cuisine.toLowerCase())
      );
    }


    // Price Filter
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];

    updatedList = updatedList.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );

    // Search Filter
    if (inputSearch) {
      updatedList = updatedList.filter(
        (item) =>
          item.title.toLowerCase().search(inputSearch.toLowerCase().trim()) !==
          -1
      );
    }



    setList(updatedList);
    !updatedList.length ? setResultsFound(false) : setResultsFound(true);


  };

  useEffect(() => {
    applyFilters();
  }, [selectedRating, inputSearch, selectedCategory, cuisines, selectedPrice]);







  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  }



  return (

    <div>
      <div className='header'>
        <Link to="/">
          <img className="header__logo" src={pic3} />
        </Link>




        <SearchBar value={inputSearch} changeInput={e => setInputSearch(e.target.value)} />


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
      <div className='home_panelList-wrap'>

        <div className="home_panel-wrap">
          <FilterPanel
            selectToggle={handleSelectCategory}
            selectedCategory={selectedCategory}
            selectRating={handleSelectRating}
            selectedRating={selectedRating}
            selectedPrice={selectedPrice}
            cuisines={cuisines}
            changeChecked={handleChangeChecked}
            changePrice={handleChangePrice} />
        </div>



        <motion.div layout

          animate={{ opacity: 10, scale: 1 }}
          intial={{ opacity: 5, scale: 3 }}
          exit={{ opacity: 5, scale: 3 }}

          className="home_list-wrap">
          {/* <img className="home__image" src={pic1} alt='' /> */}


          <div>
            {resultsFound ? <List list={list} /> : <EmptyView />}
          </div>

        </motion.div>

      </div>
    </div>


  )
}

export default Home