import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import bar from './bar';
import './style.css';

import React, { Component } from 'react'



//Lets start to build a website

let name = "Hannah";

let roles = [];
const rolesList = roles.map((role) =>
    <Role role={role} key={role}></Role>
);

//Stub out the data

const template = {
    roles: [
        {
            rolename: 'work',
            roleDescription: 'This is where I put all the notes about this role',
            habits: [
                {
                    habitName: 'show up on time',
                    habitNotes: 'I always show up to work at 7:50 AM',
                    frequency: "workdays",
                    interactions: [
                        {
                            date: 'Javascript Date object',
                            notes: 'This is the notes about how it went',
                            success: true
                        }]
                }
            ]
        },
    ]
}


//The top level element

function Wrapper(props) {
    return <div id="wrapper">
        <h1>Welcome {props.name}</h1>
        <RoleControl></RoleControl>
    </div>
}

function newRole(){
  let roleName = window.prompt('Please enter the name of the new role');
  roles.push(roleName);
  RoleList.addRole(roles);
  localStorage.setItem('roles',JSON.stringify(roles));
}


function deleteRoles(){
    roles = [];
    localStorage.setItem('roles',JSON.stringify(roles));
  }


function RoleControl(props) {
    return <div>
        <h2>this would be the add a role and delete a role buttons</h2>
        <button onClick={newRole}>Add new Role</button>
        <button onClick={deleteRoles}>Delete Roles</button>

        <RoleList/>
    </div>
}

class RoleList extends React.Component {
constructor(props) {
    super(props);
    this.state = {roles:rolesList}
}


 addRole(newRoleList){
     this.setState({
         roles:newRoleList
     })
 }

 render(){
     return (this.state.roles.map((role) =>
     <Role role={role} key={role}></Role>))
 }

}//end RoleList


function Role(props) {
    return <div>
        <h3>This area has the the role title, description, and add/delete buttons for habits/goals. It then populates the habits/goals</h3>
        <Habit></Habit>
        <p>{props.role}</p>
    </div>
}

function Habit(props) {
    return <div>
        <p>This is where the habit specific information goes. Includes buttons for if you did it or not. Has notes for each habit iteration. Has selector for frequency.</p>
        <p>Also has button to show progress over time by bringing up a colored calendar</p>
    </div>
}



const wrapper = (<div id="mainContainer">
    <Wrapper name={name}></Wrapper>
</div>)

ReactDOM.render(
    wrapper,
    document.getElementById('root')
);


