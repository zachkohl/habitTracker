import React, { Component } from 'react'
import {connect } from 'react-redux';
import moment from 'moment';
import {DELETE_ROLE,SAVE_ROLE,ADD_HABIT,DELETE_HABIT,SAVE_HABIT,ADD_GOAL,DELETE_GOAL,SAVE_GOAL} from '../actionTypes';
import SelectFreq from './selectFreq'
import Review from './Review';
import Log  from './Log';


//This links the redux store, the "state" object, to a key that will be accessible as a prop in the component
const mapStateToProps = function (state, ownProps) {
    //    const role = state.roles.filter((role)=>role.id ===ownProps.data.id);
    const goal = getById(state, ownProps.goalId,ownProps.roleId)
const title = goal.title;
const description = goal.description;
const id = goal.id;
    return { title,description,id };
};

function getById(state, goalId,roleId) {
    const role = state.roles.find((role) => role.id === roleId);
    const goal = role.goals.find((goal)=>goal.id ===goalId)
    return goal;
}





class Goal extends Component {
constructor(props){
super(props);
    this.state = {
        title:props.title,
        description:props.description,
    }
}



    delete = () => {
        if(confirm('Are you sure you want to permanently delete this goal?')){
            const payload = {goalId:this.props.id,roleId:this.props.roleId}
            this.props.delete(payload);
        }
        
    }

    save = () =>{
        const payload = {goalId:this.props.id,roleId:this.props.roleId,title:this.state.title,description:this.state.description}
        this.props.save(payload);
    }
    
    updateTitle = (event) =>{
this.setState({title:event.target.value})
    }

    updateDescription = (event) =>{
        this.setState({description:event.target.value})
            }



    render() {
        return <div className="Goal">
             <input type="text" name="newTitle" value={this.state.title} onChange={this.updateTitle}></input>
            <button className="deleteButton" onClick={this.delete}>delete</button>
            <textarea value={this.state.description} onChange={this.updateDescription} className="roleDescription"></textarea>
            <button onClick={this.save}>save</button>

        </div>
       
}
}


function mapDispatchToProps(dispatch){
    return ({delete: (payload)=>{
      dispatch({type:DELETE_GOAL,payload:payload})},
      save: (payload)=>{
        dispatch({type:SAVE_GOAL,payload:payload})}
    })
  }

export default connect(mapStateToProps,mapDispatchToProps)(Goal);