import React from 'react';
import {connect } from 'react-redux';

//This links the redux store, the "state" object, to a key that will be accessible as a prop in the component
const mapStateToProps = function (state){
    console.log('inside value->mapStateToProps')
    return { theNumber:JSON.stringify(state) }
};


//This is the component. Thanks to mapStateToProps, the key on the props is hooked up to the Redux store
function DisplayNumber(props){
  return <h1>This is the number from Redux: {props.theNumber}</h1>



}

//The connect function integrates the above to functions. Use what is returned in the up one level JSX.
export default connect(mapStateToProps)(DisplayNumber);