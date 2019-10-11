import React, { Component } from 'react'
import {connect } from 'react-redux';
import moment from 'moment';
import {DELETE_ROLE,SAVE_ROLE,ADD_HABIT,DELETE_HABIT,SAVE_HABIT,ADD_GOAL} from '../actionTypes';
import SelectFreq from './selectFreq'
import Review from './Review';
import Log  from './Log';


//This links the redux store, the "state" object, to a key that will be accessible as a prop in the component
const mapStateToProps = function (state, ownProps) {
    //    const role = state.roles.filter((role)=>role.id ===ownProps.data.id);
    const habit = getById(state, ownProps.habitId,ownProps.roleId)
    const title = habit.title;
    const date = habit.date;
    const samples = habit.samples;
    const description = habit.description;
    const id = habit.id;
    const frequency = habit.frequency; 
    const sampleIndex = habit.sampleIndex;
    const roleId = ownProps.roleId;
    const habitId = ownProps.habitId;
    return { title, samples, frequency, description, id, sampleIndex,roleId,habitId,date };
};

function getById(state, habitId,roleId) {
    const role = state.roles.find((role) => role.id === roleId);
    const habit = role.habits.find((habit2)=>habit2.id ===habitId)
    return habit;
}





class Habit extends Component {
constructor(props){
super(props);
    this.state = {
title:props.title,
description:props.description,
reviewActive:true,
    }
}

//     addRole = () =>{

//         this.props.deleteRole(this.props.data.id);
//     }

    delete = () => {
        if(confirm('Are you sure you want to permanently delete this habit and all it\'s associated success samples?')){
            const payload = {habitId:this.props.id,roleId:this.props.roleId}
            this.props.delete(payload);
        }
        
    }

    save = () =>{
        const payload = {habitId:this.props.id,roleId:this.props.roleId,title:this.state.title,description:this.state.description}
        this.props.save(payload);
    }
    
    updateTitle = (event) =>{
this.setState({title:event.target.value})
    }

    updateDescription = (event) =>{
        this.setState({description:event.target.value})
            }

review = () =>{
this.setState({reviewActive:!this.state.reviewActive})
}

    render() {

      
    
        return <div className="habit">
             <input type="text" name="newTitle" value={this.state.title} onChange={this.updateTitle}></input>
            <button className="deleteButton" onClick={this.delete}>delete</button>
            <textarea value={this.state.description} onChange={this.updateDescription} className="roleDescription"></textarea>
            <button onClick={this.save}>save</button>
            <button className="reviewButton" onClick={this.review}>Review</button>
            <SelectFreq roleId={this.props.roleId} habitId={this.props.habitId}/>
            <p>{this.props.date}</p>
            <div>{(this.state.reviewActive) &&(<Review habitId={this.props.habitId} roleId={this.props.roleId}/>)}</div>
         <Log habitId={this.props.habitId} roleId={this.props.roleId}/>
        </div>
       
}
}


function mapDispatchToProps(dispatch){
    return ({delete: (payload)=>{
      dispatch({type:DELETE_HABIT,payload:payload})},
      save: (payload)=>{
        dispatch({type:SAVE_HABIT,payload:payload})}
    })
  }

export default connect(mapStateToProps,mapDispatchToProps)(Habit);