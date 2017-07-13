import * as React from 'react'
import {Component} from 'react'
import {Header} from '../header'
import {EditDeck} from './editdeck'

export class EditPage extends Component<any,any>{
    componentDidMount(){
        let id = this.props.match.params.id;
        let xhttp = new XMLHttpRequest();
        let self = this;
        xhttp.onreadystatechange = function () {
            if(this.readyState == 4 && this.status == 200){
                let hotel = JSON.parse(this.responseText);
                self.setState({
                    hotel : hotel
                })
            }
        };
        xhttp.open("GET", `/ajax/data/detail/${id}`, true);
        xhttp.send();
    }
    state = {
        hotel : null
    };
    render(){
        return(
            <div>
                <Header />

                {
                    (()=>{
                       if(this.state.hotel != null){
                           return <EditDeck hotel ={this.state.hotel }/>
                       }
                       return <div />
                    })()
                }

            </div>

        )
    }
}