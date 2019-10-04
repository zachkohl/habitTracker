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
showMonthTable: false,
dateObject: moment(),
allMonths : moment.months(),
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

month = () =>{
    return this.state.dateObject.format('MMMM');
}


MonthList = props => {
   let months = [];
    props.data.map(data => {
        months.push(
            <td key={data} onClick={e => {this.setMonth(data)}}>
                <span>{data}</span>
            </td>
        );
    })

   let rows = [];
   let cells = [];

months.forEach((row,i) =>{
    if(i % 3 !==0|| i==0){
        cells.push(row);
    }else{
        rows.push(cells);
        cells = [];
        cells.push(row);
    }
})
rows.push(cells);

let monthlist = rows.map((d,i) => {
    let key = i + '_quarter';
    return <tr key ={key}>{d}</tr>;
})
return monthlist;
}

setMonth = month =>{
    let monthNumber = this.state.allMonths.indexOf(month);
    console.log(monthNumber)
    let dateObject = Object.assign({},this.state.dateObject);
    dateObject = moment(dateObject).set('month',monthNumber);
    this.setState({
        dateObject: dateObject,
        showMonthTable: !this.state.showMonthTable
    })
};

showMonth = (e, month) =>{
    this.setState({
        showMonthTable: !this.state.showMonthTable
    })
}


year = () =>{
    return this.state.dateObject.format("Y");
}

getDates(startDate,stopDate){
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while(currentDate <= stopDate)
{
    dateArray.push(moment(currentDate).format("YYYY"))
    currentDate =moment(currentDate).add(1,"year");
}
return dateArray;
}

yearTable = props =>{
    let months = [];
    let nextTen = moment().set("year",props).add("year",12).format("Y");

    let twelveYears = this.getDates(props,nextTen);

    twelveYears.map(data =>{
        months.push(
            <td key={data} onClick={e =>{this.setYEar(data)}}>
                <span>{data}</span>
            </td>
        )
    })
let rows = [];
let cells = [];

months.forEach((row,i)=>{
    if(i % 3!==0 ||i==0){
        cells.push(row);
    }else{
        rows.push(cells);
        cells=[];
        cells.push(row);
    }
})
rows.push(cells);
let yearList = rows.map((d,i)=>{
    const key = i+300;
    return <tr key={key}>{d}</tr>
})
return <table><thead><tr><th>Select year</th></tr></thead><tbody>{yearList}</tbody></table>
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
        for (let d=1; d<=this.daysInMonth(this.state.dateObject);d++){
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
            <div onClick={e => { this.showMonth()}}>{this.month()}
            <span>
            {" "}{<this.yearTable props={this.year()}/>}
            </span>
            </div>
            <div><table><tbody>{this.state.showMonthTable && <this.MonthList data={moment.months()}/>}</tbody></table></div>
    {!this.state.showMonthTable && ( <table><thead><tr>{weekdayShortName}</tr></thead><tbody>{daysInMonthRows}</tbody></table>)}
           
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