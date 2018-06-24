import React, {Component} from 'react';
import './App.css';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import {createBrowserHistory} from 'history';
import RootRouter from './public/RootRouter';
import reducers from "./flux/Reducers";


const store = createStore(combineReducers({...reducers}));

class App extends Component {
    render() {
        return <Provider store={store}>
            <RootRouter history={createBrowserHistory()}/>
        </Provider>;
    }
}

export default App;
