import * as React from 'react';
import { BrowserRouter,Route,Switch,Redirect,Link} from 'react-router-dom';
import {Component} from 'react';
import {MainPage} from './mainpage'
import {FirstPage} from '../web/components/firstpage'
import {DetailPage} from '../web/components/detailpage'
import {SecondPage} from '../web/components/secondpage'
import {EditPage} from './editpage'
import {AddPage} from './addpage'

export class Routes extends Component<any,any>{
    render(){
        return(
            <switch>
                <Route exact path='/admin' component={MainPage}/>
                <Route exact path='/' component={FirstPage}/>
                <Route exact path='/detail/:id' component={DetailPage}/>
                <Route exact path='/search' component={props => {
                    return <SecondPage {...props} />
                }}/>
                <Route exact path="/admin/edit/:id" component={EditPage}/>
                <Route exact path="/admin/add" component={AddPage}/>
            </switch>
        )
    }
}