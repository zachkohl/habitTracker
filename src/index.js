import ReactDOM from 'react-dom';
import React from 'react';
import './style.css';
import { Provider } from 'react-redux';
import store from './store';
import Value from './components/value';
import Add from './components/add';
import Subtract from './components/subtract';
import NewRole from './components/newrole';
import Header from './components/Header';
import DisplayRoles from './components/DisplayRoles';
// import BackUp from './components/BackUp';














const element =<Provider store={store}><Header />
<NewRole/>
<DisplayRoles/>
</Provider> ;

ReactDOM.render(
    element,
    document.getElementById('root')
);