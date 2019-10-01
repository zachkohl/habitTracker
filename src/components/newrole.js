import React, { Component } from 'react';
import {connect } from 'react-redux';
const ACTION_COMMAND = 'NEW_ROLE';
import {ADD_ROLE,DELETE_ROLE,ADD_HABIT,ADD_GOAL} from '../actionTypes';

 class NewRole extends Component {

  addRole = () => {
    const newName = window.prompt('please enter name of new role');
    if(newName ===null){
      return
    }
    let currentIndex = this.props.roleIndex+1;
    const newRole = {id:currentIndex,
                      title:newName,
                      description:'',
                    habits:[],
                    habitIndex:-1,
                  goals:[],
                  goalIndex:-1}
      const payload = {currentIndex:currentIndex,newRole:newRole}
   
    this.props.addBlankRole(payload);
}

  render() {
    return (
      <button onClick={this.addRole}>Add</button>
    )
  }
}

const mapStateToProps = function (state){
  return { roleIndex:state.roleIndex }
};

function mapDispatchToProps(dispatch){
  return ({addBlankRole: (payload)=>{
   
    dispatch({type:ADD_ROLE,payload:payload})}
  })
}




//The connect function integrates the above to functions. Use what is returned in the up one level JSX.
export default connect(mapStateToProps,mapDispatchToProps)(NewRole);