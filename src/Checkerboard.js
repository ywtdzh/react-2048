import React from 'react';
import {connect} from 'react-redux';
import {Action} from "./flux/Actions";

class Checkerboard extends React.Component {
    componentWillMount() {
        this.props.dispatch(new Action(JSON.parse(window.localStorage.scoreList || '[]')));
    }

    render(){
        return "hello world!";
    }
}

export default connect((state) => ({score: state.score}))(Checkerboard);