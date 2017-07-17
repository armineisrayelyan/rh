import * as React from 'react'
import {Component} from 'react'
import {Header} from '../web/components/header'
import {AddDeck} from './adddeck'

export class AddPage extends Component<any,any>{
    render(){
        return(
            <div>
                <Header />
                <AddDeck />
            </div>

        )
    }
}