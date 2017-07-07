import * as React from 'react';
import { BrowserRouter,Route,Switch,Redirect,Link} from 'react-router-dom';
import {Component} from 'react';
import {MainPage} from './mainpage'
import {FirstPage} from '../firstpage'

export class Routes extends Component<any,any>{
    render(){
        return(
            <switch>
                <Route exact path='/admin' component={MainPage}/>
                <Route exact path='/' component={FirstPage}/>
            </switch>
        )
    }
}