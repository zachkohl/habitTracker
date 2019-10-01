import React, { Component } from 'react'
import { connect } from 'react-redux';
import { DELETE_ROLE, SAVE_ROLE, ADD_HABIT, ADD_GOAL } from '../actionTypes';
import Habit from './Habit';


//This links the redux store, the "state" object, to a key that will be accessible as a prop in the component
const mapStateToProps = function (state, ownProps) {
    //    const role = state.roles.filter((role)=>role.id ===ownProps.data.id);
    const role = getRoleById(state, ownProps.data.id)
    const title = role.title;
    const habits = role.habits;
    const goals = role.goals;
    const description = role.description;
    const id = role.id;
    const habitIndex = role.habitIndex;
    return { title, habits, goals, description, id, habitIndex };
};

function getRoleById(state, id) {
    const role = state.roles.filter((role) => role.id === id);
    return role[0];
}




class Role extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            description: props.description
        }

    }

    addRole = () => {

        this.props.deleteRole(this.props.id);
    }

    deleteRole = () => {
        if (confirm('Are you sure you want to permanently delete this role and all it\'s associated habits and goals')) {
            this.props.deleteRole(this.props.id);
        }

    }

    saveRole = () => {
        const payload = { id: this.props.id, title: this.state.title, description: this.state.description }
        this.props.saveRole(payload);
    }

    updateTitle = (event) => {
        this.setState({ title: event.target.value })
    }

    updateDescription = (event) => {
        this.setState({ description: event.target.value })
    }

    addHabit = () => {

        const newName = window.prompt('please enter name of new habit');
        if (newName === null) {
            return
        }
        let currentIndex = this.props.habitIndex + 1;
        const newHabit = {
            id: currentIndex,
            title: newName,
            description: '',
            frequency: '',
            samples: [],
            samplesIndex:-1}

        const payload = { currentIndex: currentIndex, newHabit: newHabit,roleId:this.props.id }

        this.props.addHabit(payload);
    }


    render() {
console.log(this.props.habits)
        const ListItems = this.props.habits.map((habit) =>
            <Habit key={habit.id} habitId={habit.id} roleId={this.props.id} />);





        return <div className="role">
            <input type="text" name="newTitle" value={this.state.title} onChange={this.updateTitle}></input>
            <button className="deleteButton" onClick={this.deleteRole}>delete</button>
            <label htmlFor={this.props.data.id + 'description'}></label>
            <textarea value={this.state.description} onChange={this.updateDescription} className="roleDescription"></textarea>
            <button onClick={this.saveRole}>save</button>
            <button onClick={this.addHabit}>add habit</button>
            <button>add goal</button>
            <div>{ListItems}</div>
        </div>

    }
}


function mapDispatchToProps(dispatch) {
    return ({
        deleteRole: (payload) => {
            dispatch({ type: DELETE_ROLE, payload: payload })
        },
        saveRole: (payload) => {
            dispatch({ type: SAVE_ROLE, payload: payload })
        },
        addHabit:(payload)=>{
            dispatch({ type: ADD_HABIT, payload: payload })
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Role);