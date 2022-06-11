import React from 'react';
import './style.css';
import pic1 from '../../../empty.gif';
// import pic3 from './resumelogo.png';


const EmptyView = () => (
  <div className='emptyView-wrap'>
    <img src={pic1} alt='' />
  </div>
);

export default EmptyView;