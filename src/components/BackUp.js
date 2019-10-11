import React, { Component } from 'react'
import {connect } from 'react-redux';
import Role from './Role';
import {BACKUP} from '../actionTypes';

const mapStateToProps = function (state, ownProps) {

    return { };
};


class BackUp extends Component {
backUp = () =>{
   let path = prompt('please enter exact path to file destination')
    this.props.backUp(path)
}
    render() {
       return <button onClick={this.backUp}>backup</button>

}
}

function mapDispatchToProps(dispatch){
    return ({backUp: (payload)=>{
      dispatch({type:BACKUP,payload:payload})}
    })
  }

export default connect(mapStateToProps,mapDispatchToProps)(BackUp);