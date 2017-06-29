import * as React from 'react';
import { BrowserRouter,Route,Switch,Redirect,Link} from 'react-router-dom';
import {Component} from 'react';
import {FirstPage} from './firstpage'
import {DetailPage} from './detailpage'
import {SecondPage} from './secondpage'

export class Routes extends Component<any,any>{
    render(){
        return(
            <switch>
                <Route exact path='/' component={FirstPage}/>
                <Route exact path='/detail/:id' component={DetailPage}/>
                <Route exact path='/search' component={SecondPage}/>
            </switch>
        )
    }
}
