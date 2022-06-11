import React from 'react';
import Product from '../../../Product';
// import ListItem from './ListItem';
import './styles.css';

const List = ({ list }) => (
  <div className='list-wrap'>
    {list.map((items) => 
      <Product key={items.id} items={items} />
    )}
  </div>
);

export default List;