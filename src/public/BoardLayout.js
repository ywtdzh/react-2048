import React from 'react';

function NumBlock(props) {
    const {front, back} = NumBlock.colors[props.index] || {front: '#fff', back: '#530002'};
    const fontSize = props.index < 7 ? '5rem' : props.index < 10 ? '3.3rem' : '2.5rem';
    return <div style={{
        backgroundColor: back,
        color: front, height: '100%',
        width: '100%', fontSize,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
    }}>
        {Math.pow(2, props.index).toFixed(0)}
    </div>;
}

// noinspection SpellCheckingInspection
NumBlock.colors = [
    {front: '#505050', back: '#505050'},
    {front: '#333', back: '#f9ffbf'},
    {front: '#333', back: '#ffeea0'},
    {front: '#333', back: '#ddcb7e'},
    {front: '#333', back: '#ffcd66'},
    {front: '#FFF', back: '#ffb45d'},
    {front: '#FFF', back: '#ff9a53'},
    {front: '#FFF', back: '#ff7e54'},
    {front: '#FFF', back: '#ff5a3d'},
    {front: '#FFF', back: '#ff0b00'},
    {front: '#FFF', back: '#7c0d01'},
];

function Col(props) {
    return <div style={{width: '25%', padding: '2px', height: '100%', display: 'inline-block'}}>{props.children}</div>;
}

export function BoardRow(props) {
    const cols = [], {board, rowIndex} = props;
    for (let i = 0; i < 4; i++) {
        cols.push(<Col><NumBlock index={board[rowIndex][i]}/></Col>)
    }
    return <div style={{height: '25%', width: '100%'}}>{cols}</div>;
}
