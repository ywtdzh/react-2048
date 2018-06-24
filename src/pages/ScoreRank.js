import React from 'react';
import {connect} from 'react-redux';
import {Action} from "../flux/Actions";
import {List} from "antd";

class ScoreRank extends React.Component {
    componentDidMount() {
        this.props.dispatch(Action(JSON.parse(window.localStorage.scoreList || '[]')));
    }

    render() {
        return (<div style={{width: '100%'}}><List
            bordered
            dataSource={this.props.score}
            renderItem={item => (<List.Item>{item}</List.Item>)}
            style={{minHeight: '80vh'}}
        /></div>);
    }
}

export default connect((state) => ({
    score: state.score.map((scoreObj, index) => `${index + 1} 最大数字${scoreObj.maxNumber} 总得分${scoreObj.point} 于${scoreObj.createdAt}`),
}))(ScoreRank);