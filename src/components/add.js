import React, { Component } from 'react';
import {connect } from 'react-redux';
const ACTION_COMMAND = 'INCREMENT';

//see https://stackoverflow.com/questions/39419237/what-is-mapdispatchtoprops



 class Add extends Component {

  addNumber = () => {
    this.props.addTheNumber();
}

  render() {
    return (
      <button onClick={this.addNumber}>Add</button>
    )
  }
}

function mapDispatchToProps(dispatch){
  return ({addTheNumber: ()=>{dispatch({type:ACTION_COMMAND})}
  })
}




//The connect function integrates the above to functions. Use what is returned in the up one level JSX.
export default connect(null,mapDispatchToProps)(Add);