import React from 'react';
import {Button, Modal} from 'antd';
import {findDOMNode} from 'react-dom';
import Hammer from 'hammerjs';
import {connect} from 'react-redux';
import {Action} from "../flux/Actions";
import _ from 'lodash';
import Score from "../public/Score";
import {BoardRow} from "../public/BoardLayout";

import restart from '../restart.png';
import back from '../back.png';
import '../App.css';

const __signals__ = new WeakMap();

function generateNum(matrix) {
    const free = [];
    matrix.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
            if (value === 0) free.push({rowIndex, colIndex});
        });
    });
    if (free.length > 0) {
        const chose = free[_.random(free.length - 1)];
        matrix[chose.rowIndex][chose.colIndex] = _.random(1, 2);
    }
}

class Checkerboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(Action(JSON.parse(window.localStorage.scoreList || '[]')));
        window.addEventListener("keydown", this.keyDown);
        if (!this.swipeManager)
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
        const matrix = _.chunk(_.fill(new Array(16), 0, 0, 16), 4);
        generateNum(matrix);
        generateNum(matrix);
        this.state = {
            locked: false, // lock UI when moving
            board: matrix, // 4 * 4 board
            score: 0,
        };
        this.history = [];
        this.maxNumber = 4;
        Object.defineProperty(this, 'signal', {
            get() {
                return __signals__.get(this) || 0;
            },
            set(newSig) {
                if ((!__signals__.get(this) && newSig) || (__signals__.get(this) && !newSig)) {
                    this.setState({locked: !!newSig});
                }
                __signals__.set(this, newSig);
            },
        });
    }

    back = () => {
        if (this.history.length === 0) return;
        this.history.time = this.history.time + 1 || 1;
        const state = this.history.pop();
        state.score -= this.history.time * 100;
        this.setState(state);
    };

    move = (direction, isTest) => {
        if (this.state.locked) return;
        const matrix = this.state.board.map(row => row.slice());
        const modified = _.fill(new Array(4), false).map(() => _.fill(new Array(4), false));
        let score = this.state.score, moved = false;
        switch (direction) {
            case Hammer.DIRECTION_LEFT:
                for (let col = 1; col < 4; col++) {
                    for (let row = 0; row < 4; row++) {
                        if (matrix[row][col] === 0) continue;
                        let distance = 0, current = col - 1;
                        while (current > -1 && matrix[row][current] === 0) {
                            distance++;
                            current--;
                        }
                        if (distance === 0 && matrix[row][current] !== matrix[row][col]) {
                            continue;
                        }
                        moved = true;
                        if (current > -1) {
                            if (matrix[row][current] === matrix[row][col] && !modified[row][current]) {
                                modified[row][current] = true;
                                matrix[row][current]++;
                                const got = Math.pow(2, matrix[row][current]);
                                score += got;
                                distance++;
                                this.maxNumber = this.maxNumber < got ? got : this.maxNumber;
                                matrix[row][col] = 0;
                            } else if (matrix[row][current + 1] === 0) {
                                matrix[row][current + 1] = matrix[row][col];
                                matrix[row][col] = 0;
                            }
                        } else {
                            matrix[row][0] = matrix[row][col];
                            matrix[row][col] = 0;
                        }
                        if (!isTest) this.moveItem(direction, row, col, distance);
                    }
                }
                break;
            case Hammer.DIRECTION_UP:
                for (let row = 1; row < 4; row++) {
                    for (let col = 0; col < 4; col++) {
                        if (matrix[row][col] === 0) continue;
                        let distance = 0, current = row - 1;
                        while (current > -1 && matrix[current][col] === 0) {
                            distance++;
                            current--;
                        }
                        if (distance === 0 && matrix[current][col] !== matrix[row][col]) {
                            continue;
                        }
                        moved = true;
                        if (current > -1) {
                            if (matrix[current][col] === matrix[row][col] && !modified[row][current]) {
                                modified[row][current] = true;
                                matrix[current][col]++;
                                const got = Math.pow(2, matrix[current][col]);
                                score += got;
                                distance++;
                                this.maxNumber = this.maxNumber < got ? got : this.maxNumber;
                                matrix[row][col] = 0;
                            } else if (matrix[current + 1][col] === 0) {
                                matrix[current + 1][col] = matrix[row][col];
                                matrix[row][col] = 0;
                            }
                        } else {
                            matrix[0][col] = matrix[row][col];
                            matrix[row][col] = 0;
                        }
                        if (!isTest) this.moveItem(direction, row, col, distance);
                    }
                }
                break;
            case Hammer.DIRECTION_RIGHT:
                for (let col = 2; col > -1; col--) {
                    for (let row = 0; row < 4; row++) {
                        if (matrix[row][col] === 0) continue;
                        let distance = 0, current = col + 1;
                        while (current < 4 && matrix[row][current] === 0) {
                            distance++;
                            current++;
                        }
                        if (distance === 0 && matrix[row][current] !== matrix[row][col]) {
                            continue;
                        }
                        moved = true;
                        if (current < 4) {
                            if (matrix[row][current] === matrix[row][col] && !modified[row][current]) {
                                modified[row][current] = true;
                                matrix[row][current]++;
                                const got = Math.pow(2, matrix[row][current]);
                                score += got;
                                distance++;
                                this.maxNumber = this.maxNumber < got ? got : this.maxNumber;
                                matrix[row][col] = 0;
                            } else if (matrix[row][current - 1] === 0) {
                                matrix[row][current - 1] = matrix[row][col];
                                matrix[row][col] = 0;
                            }
                        } else {
                            matrix[row][3] = matrix[row][col];
                            matrix[row][col] = 0;
                        }
                        if (!isTest) this.moveItem(direction, row, col, distance);
                    }
                }
                break;
            case Hammer.DIRECTION_DOWN:
                for (let row = 2; row > -1; row--) {
                    for (let col = 0; col < 4; col++) {
                        if (matrix[row][col] === 0) continue;
                        let distance = 0, current = row + 1;
                        while (current < 4 && matrix[current][col] === 0) {
                            distance++;
                            current++;
                        }
                        if (distance === 0 && matrix[current][col] !== matrix[row][col]) {
                            continue;
                        }
                        moved = true;
                        if (current < 4) {
                            if (matrix[current][col] === matrix[row][col] && !modified[row][current]) {
                                modified[row][current] = true;
                                matrix[current][col]++;
                                const got = Math.pow(2, matrix[current][col]);
                                score += got;
                                distance++;
                                this.maxNumber = this.maxNumber < got ? got : this.maxNumber;
                                matrix[row][col] = 0;
                            } else if (matrix[current - 1][col] === 0) {
                                matrix[current - 1][col] = matrix[row][col];
                                matrix[row][col] = 0;
                            }
                        } else {
                            matrix[3][col] = matrix[row][col];
                            matrix[row][col] = 0;
                        }
                        if (!isTest) this.moveItem(direction, row, col, distance);
                    }
                }
                break;
            default: // do nothing
        }
        if (!isTest) {
            generateNum(matrix);
            this.history.push({board: this.state.board, score: this.state.score});
            if (this.history.length > 5) this.history.shift();
            this.setState({board: matrix, score}, () => {
                if (
                    !this.move(Hammer.DIRECTION_LEFT, true)
                    && !this.move(Hammer.DIRECTION_UP, true)
                    && !this.move(Hammer.DIRECTION_RIGHT, true)
                    && !this.move(Hammer.DIRECTION_DOWN, true)
                ) {
                    this.props.dispatch(new Action(new Score(this.state.score, this.maxNumber)));
                    this.signal++;
                    Modal.confirm({
                        title: "Game Over",
                        content: `游戏结束！您的得分为${this.state.score}，成功拼出最大数字${this.maxNumber}！`,
                        onOk: () => {
                            this.resetBoard();
                        },
                    });
                }
            });
        }
        if (moved) {
            return matrix;
        } else {
            return null;
        }
    };

    moveItem = (direction, rowIndex, colIndex, distance) => {
        // todo
        this.signal++;
        switch (direction) {
            case Hammer.DIRECTION_LEFT:
            case Hammer.DIRECTION_UP:
            case Hammer.DIRECTION_RIGHT:
            case Hammer.DIRECTION_DOWN:
            default:
        }
        this.signal--;
    };

    resetBoard = () => {
        const matrix = _.chunk(_.fill(new Array(16), 0, 0, 16), 4);
        generateNum(matrix);
        generateNum(matrix);
        this.maxNumber = 4;
        this.history = [];
        this.setState({
            locked: false, // lock UI when moving
            board: matrix, // 4 * 4 board
            score: 0,
        }, () => this.signal = 0);
    };

    keyDown = (event) => {
        if (event.defaultPrevented === true) return;
        event.preventDefault();
        if (event.key && event.key.startsWith('Arrow')) {
            this.move(Hammer["DIRECTION_" + event.key.slice(5).toUpperCase()]);
        }
    };

    render() {
        const rows = [];
        for (let i = 0; i < 4; i++) {
            rows.push(<BoardRow board={this.state.board} rowIndex={i}/>);
        }
        // noinspection RequiredAttributes
        return <div>
            <div>
                <Button className="screen-button" onClick={() => this.resetBoard()}>
                    <span><img src={restart}
                               style={{height: '40%', paddingRight: '1rem'}}
                               alt=""/></span>重新来过
                </Button>
                <Button className="screen-button" onClick={() => this.back()}>
                    <span><img src={back}
                               style={{height: '40%', paddingRight: '0.5rem'}}
                               alt=""/></span>后悔药
                </Button>
                <Button className="screen-screen">
                    得分：{this.state.score || 0}
                </Button>
            </div>
            <div style={{
                width: '100%', paddingTop: '100%', position: 'relative',
                backgroundColor: '#bbada0',
                border: '5px darkgray',
                borderRadius: '10px',
            }}>
                <div style={{position: 'absolute', top: '0', height: '100%', width: '100%'}}>
                    {rows}
                </div>
            </div>
        </div>;
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.keyDown);
        this.swipeManager.remove('swipe');
    }
}

export default connect((state) => ({score: state.score}))(Checkerboard);