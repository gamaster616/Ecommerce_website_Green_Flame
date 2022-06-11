import React from 'react'
import './Details.css'
import { useLocation } from 'react-router-dom';
import img1 from './bambooza_arts.png';
import { useStateValue } from './StateProvider';





function Details() {

  const [{ basket }, dispatch] = useStateValue();
  const location = useLocation();


  let newT1 = location.state.title;
  let newT2 = location.state.price;
  let newT2Change = newT2 + 200;
  let newT3 = location.state.image;
  let star = location.state.rating;
  let newT4 = location.state.id;


  const addToBasket = () => {
    //dispatch the item into the data layer or (Push into data layer)
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: location.state.id,
        title: location.state.title,
        image: location.state.image,
        price: location.state.price,
        rating: location.state.rating
      },
    });
  };



  return (
    <div className='details'>



      <div className='details__image'>
        <img className='img1' src={require(`${newT3}`)} alt='' />

      </div>
      <div className='details__info'>

        <br />
        <br />

        <h1>{newT1}</h1>
        <br />
        <h5>Product Code:{newT4}</h5>
        <br />

        <div className='product__rating'>
          {Array(star).fill().map((_, i) =>
            (<p>⭐</p>))}
        </div>

        <br />
        <div className='price__info'>

          <h1>₹ {newT2} </h1>

          <span> <h3> <strike>{newT2Change}</strike></h3></span>

          <span><h2 style={{ color: "green" }}> 30% off</h2></span>
        </div>


        <br />

        <div className='main__offer'>
          <div className='offer_info'>
            <span style={{ color: "green" }}><h3>&#10003;</h3></span>
            <h4><b>Bank offer</b></h4>
            <p> 20% Instant Discount on SBI Credit Cards</p>
          </div>

          <div className='offer_info'>
            <span style={{ color: "green" }}><h3>&#10003;</h3></span>
            <h4><b>Bank offer</b></h4>
            <p> 5% Unlimited Cashback on Flipcard Axis Bank Credit Card</p>
          </div>

          <div className='offer_info'>
            <span style={{ color: "green" }}><h3>&#10003;</h3></span>
            <h4><b>Bank offer</b></h4>
            <p> Extra 5% off* with Axis Bank Buzz Credit Card</p>
          </div>

          <div className='offer_info'>
            <span style={{ color: "green" }}><h3>&#10003;</h3></span>
            <h4><b>Bank offer</b></h4>
            <p> 20% Instant Discount on pay with google wallet</p>
          </div>
        </div>

        <br/>
        <br/>

        <button className='secondButton' onClick={addToBasket}>Add to Basket</button>

      </div>




    </div>
  )
}

export default Details