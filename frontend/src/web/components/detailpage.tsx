import * as React from 'react';
import {Component} from 'react';
import {Header} from './header';
import {Detail} from './detail';

export class DetailPage extends Component<any,any>{
    render(){
        return(
            <div>
                <Header />
                <Detail id = {this.props.match.params.id} />
            </div>
        )
    }
}
