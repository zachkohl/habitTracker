import React, { Component } from 'react'
import {connect } from 'react-redux';
import {DELETE_ROLE,SAVE_ROLE,ADD_HABIT,DELETE_HABIT,SAVE_HABIT,UPDATE_FREQ,ADD_GOAL} from '../actionTypes';



//This links the redux store, the "state" object, to a key that will be accessible as a prop in the component
const mapStateToProps = function (state, ownProps) {
    //    const role = state.roles.filter((role)=>role.id ===ownProps.data.id);
    const habit = getById(state, ownProps.habitId,ownProps.roleId)
    const frequency = habit.frequency; 

    return {frequency};
};

function getById(state, habitId,roleId) {
    const role = state.roles.find((role) => role.id === roleId);
    const habit = role.habits.find((habit2)=>habit2.id ===habitId)
    return habit;
}





class SelectFreq extends Component {
constructor(props){
super(props);
    this.state = {
frequency:props.frequency
    }
this.handleChange = this.handleChange.bind(this);
}

handleChange(event){
    this.setState({frequency: event.target.value});
    const payload = {habitId:this.props.habitId,roleId:this.props.roleId,frequency:event.target.value}; 
    console.log(payload)
    this.props.save(payload);
}




    render() {
        console.log(this.state.frequency)
      const value = this.state.frequency;
    
        return <div><label htmlFor="freqSelector">Frequency</label><select value={value} onChange={this.handleChange} id="freqSelector">
             <option value= 'Daily'>Daily</option>
            <option value= 'Sunday'>Sunday</option>
            <option value= 'Monday'>Monday</option>
            <option value= 'Tuesday'>Tuesday</option>
            <option value= 'Wednesday'>Wednesday</option>
            <option value= 'Thursday'>Thursday</option>
            <option value= 'Friday'>Friday</option>
            <option value= 'Saturday'>Saturday</option>

        </select></div>
       
}
}


function mapDispatchToProps(dispatch){
    return ({save: (payload)=>{
        dispatch({type:UPDATE_FREQ,payload:payload})}
    })
  }

export default connect(mapStateToProps,mapDispatchToProps)(SelectFreq);