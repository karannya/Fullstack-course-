/* import React from 'react';
import { useDispatch } from 'react-redux'
import { FilterAdded } from '../reducers/filterReducer';
const Filter = () => {
    const dispatch = useDispatch();
    const handleChange = (event) => {
      // input-field value is in variable event.target.value
      event.preventDefault();
      const data = event.target.value;
      dispatch(FilterAdded(data));
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter */

// Using connect 
import React from 'react';
import { connect } from "react-redux";
import { FilterAdded } from '../reducers/filterReducer';

const Filter = (props) => {
    
    const handleChange = (event) => {
      // input-field value is in variable event.target.value
      event.preventDefault();
      const data = event.target.value;
      props.FilterAdded(data);
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }

  const mapStateToProps = null
  const mapDispatchToProps ={
    FilterAdded,
  }
  const ConnectedFilters = connect(mapStateToProps, mapDispatchToProps)(Filter);
   export default ConnectedFilters