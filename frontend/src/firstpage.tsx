import * as React from 'react';
import {Component} from 'react';
import {Header} from './header';
import {FirstSearch} from './firstsearch'
import {AllHotels} from './allhotels'

export class FirstPage extends Component<any,any>{
    render(){
        return(
            <div>
                <Header />
                <FirstSearch navigator = {this.props.history.push} />
                <AllHotels />
            </div>

        )
    }
}