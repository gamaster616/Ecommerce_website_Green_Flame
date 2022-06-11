import React from 'react'
import FilterListToggle from '../../common/FilterListToggle'

import { categoryist,ratingList } from '../../../constants'
import './styles.css'
import CheckboxProton from '../../common/CheckboxProton'
import SliderProton from '../../common/SliderProton'

const FilterPanel = ({
  selectToggle,
  selectedCategory,
  selectRating,
  selectedRating,
  selectedPrice,
  cuisines,
  changeChecked,
  changePrice,
}) => {
  return (
    <div className='main'> 

    <br />
      
      <div className="input-group">
        <p className='label'>
         Category
        </p>
        <FilterListToggle 
          options={categoryist}
        value={selectedCategory}
        selectToggle={selectToggle}/>
      </div>


      <div className="input-group">
        <p className='label'>
         Type
        </p>
        {cuisines.map(cuisine=><CheckboxProton key={cuisine.id}
         cuisine={cuisine}
         changeChecked={changeChecked} />)}

 
      </div>

      <div className="input-group">

        <p className="label-range">
          Price Range</p>

        <SliderProton value={selectedPrice} changePrice={changePrice} />     
         </div>




      <div className="input-group">
        <p className='label'>
         Star Rating
        </p>
        <FilterListToggle 
          options={ratingList}
        value={selectedRating}
        selectToggle={selectRating}/>
        </div>


    </div>
  )
}

export default FilterPanel