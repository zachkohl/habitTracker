import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import { DELETE_ROLE, SAVE_ROLE, ADD_HABIT, DELETE_HABIT, SAVE_HABIT, ADD_GOAL,CHANGE_DATE } from '../actionTypes';



//This links the redux store, the "state" object, to a key that will be accessible as a prop in the component
const mapStateToProps = function (state, ownProps) {
    //    const role = state.roles.filter((role)=>role.id ===ownProps.data.id);
    const habit = getById(state, ownProps.habitId, ownProps.roleId)
    const date = habit.date;
    const roleId =ownProps.roleId;
    const habitId =ownProps.habitId;
    const samples = habit.samples;
    const sample = findSample(samples,date);
    console.log(sample.changeFlag)
    const success = sample.success;
    const changeFlag = sample.changeFlag;
    return { date,roleId,habitId,samples,sample,success,changeFlag };
};

function getById(state, habitId, roleId) {
    const role = state.roles.find((role) => role.id === roleId);
    const habit = role.habits.find((habit2) => habit2.id === habitId)
    return habit;
}

function findSample(samples,date){
    let find = samples.find((habit2) => habit2.date === date)
 
    if(typeof find==='undefined'){
        return {
            id: null,
            date: date,
            success: 0,
            notes: '',
            changeFlag:'f'
        }
    }else return find;
}



class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDateTable: true,
            showMonthTable: false,
            showYearTable: false,
            dateObject: moment(),
            allMonths: moment.months(),
        }

    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if(this.props.date!==prevProps.date){
            return
        }
        if ((this.props.sample.success !== prevProps.sample.success)) {

          this.setState({state: this.state})
          return
        }else

         if ((this.props.changeFlag !== prevProps.changeFlag)) {
            this.setState({state: this.state})
            return
          }

      }



    weekdayshort = moment.weekdaysShort();


    firstDayOfMonth = () => {
        let dateObject = this.state.dateObject;
        let firstDay = moment(dateObject).startOf('month').format('d');
        return firstDay;
    }

    daysInMonth = (parameter) => {
        return moment(parameter).daysInMonth();
    }

    month = () => {
        return this.state.dateObject.format('MMMM');
    }


    MonthList = props => {
        let months = [];
        props.data.map(data => {
            months.push(
                <td key={data} onClick={e => { this.setMonth(data) }}>
                    <span>{data}</span>
                </td>
            );
        })

        let rows = [];
        let cells = [];

        months.forEach((row, i) => {
            if (i % 3 !== 0 || i == 0) {
                cells.push(row);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
        })
        rows.push(cells);

        let monthlist = rows.map((d, i) => {
            let key = i + '_quarter';
            return <tr key={key}>{d}</tr>;
        })
        return monthlist;
    }

    setMonth = month => {
        let monthNumber = this.state.allMonths.indexOf(month);
        let dateObject = Object.assign({}, this.state.dateObject);
        dateObject = moment(dateObject).set('month', monthNumber);
        this.setState({
            dateObject: dateObject,
            showMonthTable: !this.state.showMonthTable,
            showDateTable: !this.state.showDateTable
        })
    };

    showMonth = (e, month) => {
        this.setState({
            showMonthTable: !this.state.showMonthTable,
            showDateTable: !this.state.showDateTable
        })
    }


    year = () => {
        return this.state.dateObject.format("Y");
    }

    showYear = (e, month) => {
        console.log('show year')
        this.setState({
            showYearTable: !this.state.showYearTable,
            showDateTable: !this.state.showDateTable
        })
        if (this.state.showMonthTable === true) {
            this.setState({
                showDateTable: false,
                showMonthTable: false
            })
        }
    }

    getDates(startDate, stopDate) {

        var dateArray = [];
        var currentDate = moment(startDate);
        var stopDate = moment(stopDate);

        while (currentDate >= stopDate) {
            dateArray.push(moment(currentDate).format("YYYY"))
            currentDate = moment(currentDate).subtract(1, "year");
        }

        return dateArray;
    }

    yearTable = props => {
        let months = [];
        let nextTen = moment().set("year", props).subtract(12, "year").format("YYYY-MM-DD");


        let twelveYears = this.getDates(props, nextTen);

        twelveYears.map(data => {
            months.push(
                <td key={data} onClick={e => { this.setYear(data) }}>
                    <span>{data}</span>
                </td>
            )
        })
        let rows = [];
        let cells = [];

        months.forEach((row, i) => {
            if (i % 3 !== 0 || i == 0) {
                cells.push(row);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
        })
        rows.push(cells);
        let yearList = rows.map((d, i) => {
            const key = i + 300;
            return <tr key={key}>{d}</tr>
        })

        return <table><thead><tr><th>Select year</th></tr></thead><tbody>{yearList}</tbody></table>
    }

    setYear = year => {
        let dateObject = Object.assign({}, this.state.dateObject);
        dateObject = moment(dateObject).set('year', year);
        this.setState({
            dateObject: dateObject,
            showYearTable: !this.state.showYearTable,
            showMonthTable: !this.state.showMonthTable
        })
    }

    setDay = (d) => {
        let dateObject = Object.assign({}, this.state.dateObject);
        const newDateObject = moment(dateObject).set('date', d);
        this.setState({
            dateObject: newDateObject,
        })
        const date = newDateObject.format('YYYY-MM-DD');
        const payload = {roleId:this.props.roleId,habitId:this.props.habitId,date:date}
        this.props.changeDate(payload);
    }

    //https://programmingwithmosh.com/react/build-a-react-calendar-component-from-scratch/

    checkDay = (d) =>{
        let dateObject = Object.assign({}, this.state.dateObject);
        const newDateObject = moment(dateObject).set('date', d);
        const date = newDateObject.format('YYYY-MM-DD');
        //find match
        const match = this.props.samples.find((sample) => sample.date === date);
        if(typeof match ==='undefined'){
            return '';
        }else if(match.success===1){
            return "green";
        }else if((match.success===2)&&(match.notes==='')){
            return "red";
        }else if(match.success===2){
            return "yellow";
        }
    }

    render() {

        let weekdayShortName = this.weekdayshort.map(day => {
            return (<th key={day} className="week-day">
                {day}
            </th>)
        })

        let blanks = [];

        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            let y = i + 50;
            blanks.push(<td key={y} className="calendar-day-empty">{""}</td>)
        }

        let daysInMonthLeft = [];
        for (let d = 1; d <= this.daysInMonth(this.state.dateObject); d++) {
            let color = this.checkDay(d);
            daysInMonthLeft.push(<td key={d} className="calendar-day" onClick={e =>{this.setDay(d)}} style={{"backgroundColor":color}}>{d}</td>)

        }

        let totalSlots = [...blanks, ...daysInMonthLeft];

        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {

            if (i % 7 !== 0) {
                cells.push(row);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                rows.push(cells);
            }
        })


        let daysInMonthRows = rows.map((d, i) => {
            let x = i + 100;
            return <tr key={x}>{d}</tr>;
        });

        return <div>
            <div>
                <span onClick={e => { this.showMonth() }}>{this.month()}</span>
                <span onClick={e => { this.showYear() }}>{" "}{this.year()}</span>
            </div>

            <div>
                <span>
                    {this.state.showYearTable && (<this.yearTable props={this.year()} />)}
                </span>
            </div>


            <div><table><tbody>{this.state.showMonthTable && <this.MonthList data={moment.months()} />}</tbody></table></div>
            {this.state.showDateTable && (<table><thead><tr>{weekdayShortName}</tr></thead><tbody>{daysInMonthRows}</tbody></table>)}

        </div>

    }
}


function mapDispatchToProps(dispatch) {
    return ({
        delete: (payload) => {
            dispatch({ type: DELETE_HABIT, payload: payload })
        },
        save: (payload) => {
            dispatch({ type: SAVE_HABIT, payload: payload })
        },
        changeDate: (payload) => {
            dispatch({ type: CHANGE_DATE, payload: payload })
        }

    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);