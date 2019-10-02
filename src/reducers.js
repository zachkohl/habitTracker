import defaultState from './defaultState';
import { combineReducers } from 'redux';
import { ADD_ROLE, DELETE_ROLE, SAVE_ROLE, ADD_HABIT, DELETE_HABIT, SAVE_HABIT,UPDATE_FREQ, ADD_GOAL } from './actionTypes';
var _ = require('lodash');


function rootReducer(state = defaultState, action) {
    const newState = { ...state };
    let roleIndex = null;
    let habitIndex = null;

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
            console.log(newState.roles[roleIndex].habits[habitIndex].frequency);

            return newState;

        default:
            return state
    }
}



export default rootReducer;