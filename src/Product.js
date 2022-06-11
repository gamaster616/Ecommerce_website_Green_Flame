import React from 'react'
import "./Product.css";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from './StateProvider';
import {motion} from 'framer-motion';
import { dataList } from './constants';




function Product({items:{ id, title, image, price, rating }}) {

  const [{ basket }, dispatch] = useStateValue();
  const history = useNavigate();

  var t1 = id;
  var t2 = title;
  var t3 = image;
  var t4 = price;
  var t5 = rating;

  

  


  const addToBasket = () => {
    //dispatch the item into the data layer or (Push into data layer)
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating
      },
    });
  };



  


  const detail = ( id, title, image, price, rating ) => {

      history('/details',{state:{id:id,title:title,image:image,price:price,rating:rating}});
     
    ;

  };


  

  return (

    <motion.div layout className="product">

      <img src="" alt="" />
      
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating).fill().map((_, i) =>
            (<p>⭐</p>))} {rating}/5
        </div>
      </div>
      {/* <img src={image} alt='Product image' /> */}
      {/* <img src={image} alt="" />   */}
      <img src={require(`${image}`)} alt="" />



      <button onClick={addToBasket}>Add to Basket</button>
      <button onClick={()=>{detail(t1,t2,t3,t4,t5);}}>Details</button>

    </motion.div>
  )
}

export default Product