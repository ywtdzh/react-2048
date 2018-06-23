import React from 'react';
import {findDOMNode} from 'react-dom';
import Hammer from 'hammerjs';
import {connect} from 'react-redux';
import {Action} from "./flux/Actions";
import _ from 'lodash';

class Checkerboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(Action(JSON.parse(window.localStorage.scoreList || '[]')));
        window.addEventListener("keydown", this.keyDown);
        this.swipeManager = new Hammer.Manager(findDOMNode(this), {
            recognizers: [[Hammer.Swipe, {direction: Hammer.DIRECTION_ALL}]],
        });
        this.swipeManager.on("swipe", (events) => {
            switch (events.direction) {
                case Hammer.DIRECTION_LEFT:
                    this.move(Hammer.DIRECTION_LEFT);
                    break;
                case Hammer.DIRECTION_UP:
                    this.move(Hammer.DIRECTION_UP);
                    break;
                case Hammer.DIRECTION_RIGHT:
                    this.move(Hammer.DIRECTION_RIGHT);
                    break;
                case Hammer.DIRECTION_DOWN:
                    this.move(Hammer.DIRECTION_DOWN);
                    break;
                default:
            }
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            locked: false, // lock UI when moving
            board: _.chunk(_.fill(new Array(16), 0, 0, 16), 4), // 4 * 4 board
        };
    }

    move(direction) {
        const matrix = this.state.board.map(row => [...row]);
        switch (direction) {
            case Hammer.DIRECTION_LEFT:
                for (let col = 0; col < 4; col++) {
                    for (let row = 0; row < 4; row++) {

                    }
                }
                break;
            case Hammer.DIRECTION_UP:
                for (let row = 0; row < 4; row++) {
                    for (let col = 0; col < 4; col++) {

                    }
                }
                break;
            case Hammer.DIRECTION_RIGHT:
                for (let col = 3; col > -1; col++) {
                    for (let row = 3; row > -1; row++) {

                    }
                }
                break;
            case Hammer.DIRECTION_DOWN:
                for (let row = 3; row > -1; row++) {
                    for (let col = 3; col > -1; col++) {

                    }
                }
                break;
            default: // do nothing
        }
        this.setState({board: matrix});
    }

    moveItem(direction, rowIndex, colIndex) {
        // todo
        switch (direction) {
            case Hammer.DIRECTION_LEFT:
            case Hammer.DIRECTION_UP:
            case Hammer.DIRECTION_RIGHT:
            case Hammer.DIRECTION_DOWN:
            default:
        }
    }

    keyDown = (event) => {
        if (event.defaultPrevented === true) return;
        event.preventDefault();
        if (event.key && event.key.startsWith('Arrow')) {
            this.move(Hammer["DIRECTION_" + event.key.slice(5).toUpperCase()]);
        }
    };

    render() {
        return <div style={{width: '100%', height: '80vh'}}></div>;
    }

    componentWillUnmount() {
        window.addEventListener("keydown", this.keyDown);
        this.swipeManager.remove('swipe');
    }
}

export default connect((state) => ({score: state.score}))(Checkerboard);