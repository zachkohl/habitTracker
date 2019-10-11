import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash';
import defaultState from './defaultState';
import rootReducer from './reducers';

// write a function called a reducer. Again, nothing magical about it—
//it’s just a function that takes state and action as arguments, and returns the next state of the app.

// function counter(state = 0, action) {
//     switch (action.type) {
//       case 'INCREMENT':
//         return state + 1
//       case 'DECREMENT':
//         return state - 1
//       default:
//         return state
//     }
//   }


  
  
let stroredState = loadState();

  let store = createStore(rootReducer,stroredState,applyMiddleware(thunk))

//   store.subscribe(() => console.log(store.getState()))

//   store.dispatch({ type: 'INCREMENT' })

//   store.dispatch({ type: 'INCREMENT' })


//Setup persistence
//Food for thought came from https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e

function loadState(){
//get the state
try{
let stringJSON = localStorage.getItem('state')
if(stringJSON===null){
    return defaultState;
}
return JSON.parse(stringJSON);
}catch(e){
    return e;
}
}//end loadState


//Save the state
const saveState=(state)=>{
    try{
const stringifiedState = JSON.stringify(state);
localStorage.setItem('state',stringifiedState);
    }catch(e){
console.log(e);
    }
}
//Subscribe to state changes
store.subscribe(() => throttle(saveState(store.getState()),1000));


export default store;
