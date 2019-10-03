import React, { Component } from 'react'
import {connect } from 'react-redux';
import moment from 'moment';
import {DELETE_ROLE,SAVE_ROLE,ADD_HABIT,DELETE_HABIT,SAVE_HABIT,ADD_GOAL} from '../actionTypes';



//This links the redux store, the "state" object, to a key that will be accessible as a prop in the component
const mapStateToProps = function (state, ownProps) {
    //    const role = state.roles.filter((role)=>role.id ===ownProps.data.id);
    const habit = getById(state, ownProps.habitId,ownProps.roleId)

    return {  };
};

function getById(state, habitId,roleId) {
    const role = state.roles.find((role) => role.id === roleId);
    const habit = role.habits.find((habit2)=>habit2.id ===habitId)
    return habit;
}





class Review extends Component {
constructor(props){
super(props);
    this.state = {
dateObject: moment(),
    }
  
}
weekdayshort = moment.weekdaysShort();


firstDayOfMonth = () =>{
    let dateObject = this.state.dateObject;
    let firstDay = moment(dateObject).startOf('month').format('d');
    return firstDay;
}

daysInMonth = (parameter) =>{
    return moment(parameter).daysInMonth();
}

//https://programmingwithmosh.com/react/build-a-react-calendar-component-from-scratch/

    render() {
        let weekdayShortName = this.weekdayshort.map(day =>{
            return ( <th key={day} className="week-day">
                {day}
            </th>)
        })
     
        let blanks = [];

        for (let i=0;i<this.firstDayOfMonth(); i++){
            let y = i +50;
            blanks.push(<td key={y} className="calendar-day-empty">{""}</td>)
        }
     
        let daysInMonthLeft = [];
        for (let d=1; d<=this.daysInMonth(this.dateObject);d++){
            daysInMonthLeft.push(<td key={d} className="calendar-day">{d}</td>)
           
        }
   
        let totalSlots = [...blanks, ...daysInMonthLeft];
    
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) =>{
         
            if (i % 7 !==0){
                cells.push(row);
            }else{
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
            if( i ===totalSlots.length -1){
                rows.push(cells);
            }
        })
        
        
        let daysInMonthRows = rows.map((d,i) => {
            let x = i+100;
        return <tr key={x}>{d}</tr>;
        });

        return <div>
            <table><thead><tr>{weekdayShortName}</tr></thead><tbody>{daysInMonthRows}</tbody></table>
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

export default connect(mapStateToProps,mapDispatchToProps)(Review);