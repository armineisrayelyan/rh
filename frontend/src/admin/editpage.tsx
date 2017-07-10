import * as React from 'react'
import {Component} from 'react'
import {Header} from '../header'
import {EditDeck} from './editdeck'

export class EditPage extends Component<any,any>{
    render(){
        return(
            <div>
                <Header />
                <EditDeck id={this.props.match.params.id}/>
            </div>

        )
    }
}