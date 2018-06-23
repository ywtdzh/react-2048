import React from 'react';
import {connect} from 'react-redux';
import {Action} from "./flux/Actions";
import {List} from "antd";

class ScoreRank extends React.Component {
    componentWillMount() {
        this.props.dispatch(new Action(JSON.parse(window.localStorage.scoreList || '[]')));
    }

    render() {
        return (<List
            bordered
            dataSource={this.props.score}
            renderItem={item => (<List.Item>{item}</List.Item>)}
        />);
    }
}

export default connect((state) => ({
    score: state.score.map(scoreObj => (scoreObj.point + scoreObj.createAt)),
}))(ScoreRank);