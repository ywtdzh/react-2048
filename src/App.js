import React, {Component} from 'react';
import {Layout, Button} from 'antd';
import './App.css';

const {Header, Footer, Content} = Layout;

class App extends Component {
    render() {
        return [
            <Header>header</Header>,
            <Content ><Button type="primary">Button</Button></Content>,
            <Footer>footer</Footer>,
        ];
    }
}

export default App;
