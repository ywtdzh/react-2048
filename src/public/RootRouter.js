import React from 'react';
import {Router, Route, Redirect, Link, Switch} from 'react-router-dom';
import {Layout} from 'antd';
import '../App.css';
import ScoreRank from "../pages/ScoreRank";
import Checkerboard from "../pages/Checkerboard";

const {Header, Footer, Content} = Layout;

function NavItem(props) {
    return <small style={{paddingLeft: '30px'}} className="hide-when-narrow">{props.children}</small>
}

function RootRouter(props) {
    return <Router {...props}>
        <Route path='/' component={() => <React.Fragment>
            <Header>
                <h2 style={{color: '#EEEEEE', overflowX: 'hidden', whiteSpace: 'nowrap'}}>React-2048&nbsp;
                    <NavItem><Link to='/checkerboard'>游戏</Link></NavItem>
                    <NavItem><Link to='/scorelist'>排行</Link></NavItem>
                </h2>
            </Header>
            <Content className="content-body" style={{
                display:'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Switch>
                    <Route path='/checkerboard' component={() => <Checkerboard/>}/>
                    <Route path='/scorelist' component={() => <ScoreRank/>}/>
                    <Route component={() => <Redirect to='/checkerboard'/>}/>
                </Switch>
            </Content>
            <Footer>ClaimYang&copy;2018, All Rights Reserved</Footer>
        </React.Fragment>}/>
    </Router>;
}

export default RootRouter;