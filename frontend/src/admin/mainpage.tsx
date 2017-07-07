import * as React from 'react';
import {Component} from 'react';
import {Header} from '../header';
import {DBTable} from './dbtable';


export class MainPage extends Component<any,any>{
    render(){
        return(
            <div>
                <Header />
                <DBTable />
            </div>
        )
    }
}

