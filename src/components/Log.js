import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import { DELETE_ROLE, SAVE_ROLE, ADD_HABIT, DELETE_HABIT, SAVE_HABIT, UPDATE_FREQ, ADD_GOAL, ADD_SAMPLE,UPDATE_SAMPLE,UPDATE_SAMPLE_NOTES } from '../actionTypes';



//This links the redux store, the "state" object, to a key that will be accessible as a prop in the component
const mapStateToProps = function (state, ownProps) {
   
    const habit = getById(state, ownProps.habitId, ownProps.roleId)
    const date = habit.date;
    const sample = findSample(habit.samples,date);
    const notes = sample.notes;
    const roleId = ownProps.roleId;
    const samples = habit.samples;
    const samplesIndex = habit.samplesIndex;
    const habitId = habit.id;
  const buttonSuccess = checkSuccess(sample.success);
  const buttonFailure = checkFailure(sample.success);


    return { samples, samplesIndex, roleId, habitId,notes,date,sample,buttonSuccess,buttonFailure };
};

function findSample(samples,date){
    let find = samples.find((habit2) => habit2.date === date)
 
    if(typeof find==='undefined'){
        return {
            id: null,
            date: date,
            success: 0,
            notes: '',
            changeFlag:'f',
        }
    }else return find;
}

function checkSuccess(success){
 
    if(success===0){
return '';
        }
        else if(success===1){
return 'green';
        }
        else if(success===2){
return '';
        }
}

function checkFailure(success){
    if(success===9){
return '';
        }
        else if(success===1){
return '';
        }
        else if(success===2){
return 'red';
        }
}


function getById(state, habitId, roleId) {

    const role = state.roles.find((role) => role.id === roleId);
    const habit = role.habits.find((habit2) => habit2.id === habitId)
    return habit;
}

// function getSampleByDate(payloadById,date){
//    let sample = payloadById.habit.samples.find((sample) => sample.date === date);
//    if(typeof sample ==='undefined'){
//        return    {
//         id: null,
//         date: date,
//         success: 0,
//         notes: ''
//     }
//    }else{
//        return sample;
//    }
// }





class Log extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: this.props.notes,
            radioSuccess:this.props.radioSuccess,
            radioFailure:this.props.radioFailure,
        }
        this.refOne = React.createRef();
        this.refTwo = React.createRef();
    }


    updateNotes = (event) => {
        console.log(this.props.sample.changeFlag)
        let changeFlag =(this.props.sample.changeFlag==='f')?'t':'f';
        console.log(changeFlag)
        const payload ={
            notes:event.target.value,
             date: this.props.date, 
             roleId: this.props.roleId, 
             habitId: this.props.habitId,
             changeFlag:changeFlag,
        }
        this.props.updateSampleNotes(payload)
        
    }

    handleSuccess = () => {
        this.addSample(1)
    }

    handleFailure = () => {
        this.addSample(2)
    }

    addSample = (successValue) => {

        // const currentDate = this.props.date;
        // const notes = this.state.notes;
        // let sampleIndex = null;
        // sampleIndex = newState.roles[roleIndex].habits[habitIndex].samples.findIndex((sample) => sample.date === action.payload.date)
        const newSample = {
                date: this.props.date,
                success: successValue,
                notes: this.props.notes,
                changeFlag:this.props.changeFlag,
        }



        this.props.addNewSample({newSample:newSample,habitId:this.props.habitId,roleId:this.props.roleId});
        // const sampleToday = this.props.samples.findIndex((sample) => sample.date === this.props.date)
        // if (typeof sampleToday === -1) {
           
        //     let currentIndex = this.props.samplesIndex + 1;
        //     const javascriptDate = currentDate;
        //     const newSample =
        //     {
        //         id: currentIndex,
        //         date: javascriptDate,
        //         success: radioValue,
        //         notes: notes
        //     }
        //     const payload = { currentIndex: currentIndex, newSample: newSample, roleId: this.props.roleId, habitId: this.props.habitId }
        //     console.log('this is inside addSample' +payload.newSample.success)
        //     this.props.addNewSample(payload);
        // } else {

        //     const payload = { updatedSample: {
        //         id: this.props.sample.id,
        //         date: this.props.sample.date,
        //         success: radioValue,
        //         notes: this.props.sample.notes,
        //     }, roleId: this.props.roleId, habitId: this.props.habitId }
           
        //     this.props.updateSample(payload);
        // }
    }//end addSample



    render()
    {
        return <div>
            <p>Habit was a:</p>
            <button onClick={this.handleSuccess} style={{backgroundColor:this.props.buttonSuccess}}>Success</button>
            <button onClick={this.handleFailure} style={{backgroundColor:this.props.buttonFailure}}>Failure</button>
            {/* <label>
                <input type="radio" name="success" value={true} checked={this.props.radioSuccess ? this.props.radioSuccess : 'empty'}  onChange={this.handleRadioSuccess}/>
                Success
            </label>
            <label>
                <input type="radio" name="success" value={false}   checked={this.props.radioFailure}  onChange={this.handleRadioFailure}/>
                Failure
            </label> */}
            {/* <button onClick={this.success}>Success</button><button>Failure</button> */}
            {((this.props.sample.success===1)||(this.props.sample.success===2))&&(<textarea value={this.props.notes} onChange={this.updateNotes}></textarea>)}

        </div>
    }
}


function mapDispatchToProps(dispatch) {
    return ({
        addNewSample: (payload) => {
            console.log('inside react-redux mapDispatch')
            dispatch({ type: ADD_SAMPLE, payload: payload })
        },
        updateSample: (payload) => {
            dispatch({ type: UPDATE_SAMPLE, payload: payload })
        },
        updateSampleNotes: (payload) => {
            dispatch({ type: UPDATE_SAMPLE_NOTES, payload: payload })
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Log);