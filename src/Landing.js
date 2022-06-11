import React from 'react'
import './Landing.css'
import pic3 from './resumelogo.png';
import leaf from './green_city.png';
import bird from './bird.png';
import earth from './earth.png';
import { Link } from "react-router-dom";
import { auth } from './firebase';
import { useStateValue } from './StateProvider';

import Login from './Login'

function Landing() {

  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  }

  return (


    <div className='landing__main'>
      <div>
        <section>
          <header>

            <div>
              <img src={pic3} width="100" height="90" alt="logo" />


            </div>


            <div>

              <ul>
                <li>HOME</li>
                <li>ABOUT</li>
                <li>SERVICES</li>
                <li>BLOG</li>
                <li>

                  <Link to={!user && "/login"}>
                    <button className='login_btn'>
                      <div onClick={handleAuthentication}>
                        <p >
                          Login <i class="arrow right"></i>
                        </p>
                      </div>
                    </button>
                  </Link>

                </li>
              </ul>

            </div>

          </header>
        </section>

        <div id="main">
          <div className="main-text">
            <br />

            <span id='together'>Together</span> <br />We can restore<br />
            the planet
            <br />
            <Link to={!user && "/login"}>
              <button className='read__more'>
                <div onClick={handleAuthentication}>
                  <div className="header__optionTwo">
                    Read More
                  </div>
                </div>
              </button>
            </Link>

          </div>
          <div>
            <img id='image' src={leaf} width='720' alt="green_city-image" />
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />


        </div>

        <div className='gap'>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>




        <div className='main__2'>

          <br />
          <br />


          <br />
          <br /><br />
          <div>
            <img src={earth} alt="" />

          </div>
          <div className='text__part'>

            <br />

            <span id='together'>Make Earth</span> <br />a better<br />place to live<br />
            <Link to={!user && "/login"}>
              <button className='read__more'>
                <div onClick={handleAuthentication}>
                  <div className="header__optionTwo">
                    Join Team
                  </div>
                </div>
              </button>
            </Link>

            <br />
            <br />


            <br />
            <br /><br />


          </div>

        </div>





        <div className='footer'>
          <img src={bird} width='80%' alt="" />
        </div>

      </div>

    </div>


  )
}

export default Landing