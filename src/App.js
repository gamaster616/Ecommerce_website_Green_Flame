import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from "@stripe/stripe-js";
import { Element, Elements } from "@stripe/react-stripe-js";
import Order from './Orders';
import Details from './Details';
import Landing from './Landing';


const promise = loadStripe('pk_test_51KhRzlSConOUA4zT8mQs0iiQFYbuT8wDuHLg0dcUtb8O3oes9jcRGtniBfNWqGln3sHP67lKmPvURWLWCOZexmtH00uBp3u3J6');



function App() {

  const [{ }, dispatch] = useStateValue();

  useEffect(() => {
    //ek baar run hoga jab app component load hoga....

    auth.onAuthStateChanged(authUser => {
      console.log("The User is >>>", authUser)

      if (authUser) {
        //agar page ko refresh karoge to sign-in hi rahoge agar pahle sign-in kiya tha

        //login hoga to tab use-info ko data layer me shoot kar dega
        dispatch({
          type: 'SET_USER',
          user: authUser
        })

      }
      else {
        //agar nahi to logout hojaega
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }


    })
  }, [])



  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={
            <div>
              <Login />
            </div>} />
          <Route path="/orders" element={
            <div>
              <Header />
              <Order />
            </div>} />
          <Route path="/checkout" element={
            <div>
              <Header />
              <Checkout />
            </div>} />
          <Route path="/details" element={
            <div>
              <Header />
              <Details />
            </div>} />
          <Route path="/payment" element={
            <div>
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </div>} />
          <Route path="/home" element={
            <div>
              <Home />
          
            </div>
          } />
           <Route path="/" element={
            <div>
            
              <Landing/>
            </div>
          } />


        </Routes>
      </div>
    </Router>

  );
}

export default App;
