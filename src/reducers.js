import defaultState from './defaultState';
import { combineReducers } from 'redux';
import { ADD_ROLE, DELETE_ROLE, SAVE_ROLE, ADD_HABIT, DELETE_HABIT, SAVE_HABIT, UPDATE_FREQ, ADD_GOAL, DELETE_GOAL, SAVE_GOAL, ADD_SAMPLE, UPDATE_SAMPLE, CHANGE_DATE, UPDATE_SAMPLE_NOTES,BACKUP } from './actionTypes';
var _ = require('lodash');
const fs = require('fs');


function rootReducer(state = defaultState, action) {
    const newState = { ...state };
    let roleIndex = null;
    let habitIndex = null;
    let goalIndex = null;
    let sample = null;
    let sampleIndex = null;

    switch (action.type) {
        case ADD_ROLE:
            newState.roleIndex = action.payload.currentIndex;
            newState.roles = [...state.roles]; //Got to use the spread operator. 
            newState.roles = _.concat(newState.roles, action.payload.newRole);
            return newState;

        case DELETE_ROLE:
            newState.roles = newState.roles.filter(role => role.id != action.payload)
            return newState;

        case SAVE_ROLE:
            const updatedRoleIndex = newState.roles.findIndex(role => role.id == action.payload.id)
            newState.roles[updatedRoleIndex].title = action.payload.title;
            newState.roles[updatedRoleIndex].description = action.payload.description;
            return newState;

        case ADD_HABIT:
            roleIndex = newState.roles.findIndex((role) => role.id == action.payload.roleId);
            newState.roles[roleIndex].habits = _.concat(newState.roles[roleIndex].habits, action.payload.newHabit);
            newState.roles[roleIndex].habitIndex = action.payload.currentIndex;
            return newState;


        case DELETE_HABIT:
            roleIndex = newState.roles.findIndex((role) => role.id == action.payload.roleId);
            newState.roles[roleIndex].habits = newState.roles[roleIndex].habits.filter(habit => habit.id != action.payload.habitId);

            return newState;

        case SAVE_HABIT:
            roleIndex = newState.roles.findIndex((role) => role.id == action.payload.roleId);
            habitIndex = newState.roles[roleIndex].habits.findIndex((habit) => habit.id == action.payload.habitId);
            newState.roles[roleIndex].habits[habitIndex].title = action.payload.title;
            newState.roles[roleIndex].habits[habitIndex].description = action.payload.description;

            return newState;

        case UPDATE_FREQ:
            roleIndex = newState.roles.findIndex((role) => role.id == action.payload.roleId);
            habitIndex = newState.roles[roleIndex].habits.findIndex((habit) => habit.id == action.payload.habitId);
            newState.roles[roleIndex].habits[habitIndex].frequency = action.payload.frequency;

            return newState;

        case ADD_SAMPLE:
            console.log('inside ADD_SAMPLE');

            roleIndex = newState.roles.findIndex((role) => role.id == action.payload.roleId);
            habitIndex = newState.roles[roleIndex].habits.findIndex((habit) => habit.id == action.payload.habitId);
            //search for the sample
            sampleIndex = newState.roles[roleIndex].habits[habitIndex].samples.findIndex((sample) => sample.date === action.payload.newSample.date)
            if (sampleIndex === -1) {

                newState.roles[roleIndex].habits[habitIndex].samples.push(action.payload.newSample);
                return newState;
            }
            else {
                newState.roles[roleIndex].habits[habitIndex].samples[sampleIndex] = action.payload.newSample;
                return newState;
            }


        case UPDATE_SAMPLE:
            console.log('inside UPDATE_SAMPLE');
            roleIndex = newState.roles.findIndex((role) => role.id == action.payload.roleId);
            habitIndex = newState.roles[roleIndex].habits.findIndex((habit) => habit.id == action.payload.habitId);
            sampleIndex = newState.roles[roleIndex].habits[habitIndex].samples.findIndex((sample) => sample.date === action.payload.updatedSample.date)

            if (sampleIndex === -1) {
                console.log('no update')
                return newState;
            }
            console.log("the one in question" + action.payload.updatedSample.success)
            newState.roles[roleIndex].habits[habitIndex].samples[sampleIndex] = action.payload.updatedSample;
            return newState;

        case UPDATE_SAMPLE_NOTES:
            roleIndex = newState.roles.findIndex((role) => role.id == action.payload.roleId);
            habitIndex = newState.roles[roleIndex].habits.findIndex((habit) => habit.id == action.payload.habitId);
            sampleIndex = newState.roles[roleIndex].habits[habitIndex].samples.findIndex((sample) => sample.date === action.payload.date)
            if (sampleIndex === -1) {

                return newState;
            }
            newState.roles[roleIndex].habits[habitIndex].samples[sampleIndex].notes = action.payload.notes;
            newState.roles[roleIndex].habits[habitIndex].samples[sampleIndex].changeFlag = action.payload.changeFlag;
            return newState;


        case CHANGE_DATE:
            console.log(action.payload.roleId)
            roleIndex = newState.roles.findIndex((role) => role.id == action.payload.roleId);
            habitIndex = newState.roles[roleIndex].habits.findIndex((habit) => habit.id == action.payload.habitId);
            newState.roles[roleIndex].habits[habitIndex].date = action.payload.date;
            return newState;


        case ADD_GOAL:
            roleIndex = newState.roles.findIndex((role) => role.id == action.payload.roleId);
            newState.roles[roleIndex].goals = _.concat(newState.roles[roleIndex].goals, action.payload.newGoal);
            newState.roles[roleIndex].goalIndex = action.payload.currentIndex;
            return newState;

        case DELETE_GOAL:
            roleIndex = newState.roles.findIndex((role) => role.id == action.payload.roleId);
            newState.roles[roleIndex].goals = newState.roles[roleIndex].goals.filter(goal => goal.id != action.payload.goalId);

            return newState;

        case SAVE_GOAL:
            roleIndex = newState.roles.findIndex((role) => role.id == action.payload.roleId);
            goalIndex = newState.roles[roleIndex].goals.findIndex((goal) => goal.id == action.payload.goalId);
            newState.roles[roleIndex].goals[goalIndex].title = action.payload.title;
            newState.roles[roleIndex].goals[goalIndex].description = action.payload.description;

            return newState;


            case BACKUP:
                console.log('inside reducer')
                const pathToFile = action.payload;
                const finialAddress = pathToFile + "habitTracker.json";
                fs.writeFileSync(finialAddress,JSON.stringify(newState,null,2));
const writeData = (newState,finialAddress) =>{

}
    console.log('should have written the file')
                return newState;

        default:
            return state
    }
}



export default rootReducer;