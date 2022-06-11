import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import "./Payment.css"
import { useStateValue } from './StateProvider';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './Reducer';
import { paymentIntent } from "@stripe/react-stripe-js"
import axios from "./axios";
import { db } from "./firebase";



function Payment() {

  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();
  const history = useNavigate();


  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [disable, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);



  useEffect(() => {

    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`
      });
      setClientSecret(response.data.clientSecret)
    }
    getClientSecret();

  }, [basket])

  console.log('the secrete is >> ', clientSecret)
  console.log("man", user)


  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then(({ paymentIntent }) => {

      db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created
        })

      setSucceeded(true);
      setError(null);
      setProcessing(false);

      dispatch({
        type: "EMPTY_BASKET"
      })

      history("/orders", { replace: true });
    })

  }

  const handleChange = event => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  }


  return (
    <div className='payment'>
      <div className='payment__container'>

        <h1>
          Checkout(
          <Link to="/checkout">{basket?.length}items</Link>
          )
        </h1>


        <div className='payment__section'>

          <div className='payment__title'>
            <h3>Delivery address</h3>
          </div>

          <div className='payment__address'>
            <p> {user?.email}</p>
            <p> 123 React Lane </p>
            <p> los angeles,CA  </p>
          </div>
        </div>

        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review item and Delivery</h3>
          </div>
          <div className='payment__items'>
            {basket.map(item => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}

          </div>




        </div>

        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Payment method</h3>
          </div>
          <div className='payment__details'>

            <form onClick={handleSubmit}>
              <CardElement onChange={handleChange} />
              <br />
              <div className='payment__priceContainer'>
               
                <CurrencyFormat
                  renderText={(value) => (
                    <h3>Order Total:{value}</h3>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />

                <button disabled={processing || disable || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>



        </div>



      </div>

    </div>
  )
}

export default Payment