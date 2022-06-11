import React from 'react'
import './Checkout.css'
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider'
import Subtotal from './Subtotal';
import pic2 from './resume3.jpg';



function Checkout() {

  const [{basket,user},dispatch] = useStateValue();


  return (
    <div className='checkout'>
      <div className="checkout__left">
        <img className="checkout__ad" src={pic2} alt="" />

        <div>
          <h2>Hello,  {user?.email}</h2>
          <h2 className="checkout__title">Your Shopping basket</h2>
          <br/>

          <hr/>
          

          {basket.map(item => (<CheckoutProduct
            id={item.id}
            title={item.title}
            price={item.price}
            rating={item.rating}
            image={item.image}
          /> ))}

          


        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  )
}

export default Checkout