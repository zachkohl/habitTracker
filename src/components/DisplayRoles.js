import React, { Component } from 'react'
import {connect } from 'react-redux';
import Role from './Role';

//This links the redux store, the "state" object, to a key that will be accessible as a prop in the component
const mapStateToProps = function (state){
    return { rolesList:state.roles }
};



class DisplayRoles extends Component {

    render() {
        if(this.props.rolesList.length ===0){
        return <p>add a role to get started</p>
        }

const listItems = this.props.rolesList.map((role) =>
  <Role key={role.id} data={role} id={role.id}/>);


  return <div>{listItems}</div>

}
}

export default connect(mapStateToProps)(DisplayRoles);
