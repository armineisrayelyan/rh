import * as React from 'react';
import {Component} from 'react';

export class SearchedHotels extends Component<any,any>{
    componentDidMount(){
        let params = this.props.params;
        let query = {};
        params.forEach((v,k)=>{
            query[k] = v;
        });

    }
    private collection = [];
    state = {
        hotels : []
    };
    render(){
        return(
            <div className="col-sm-8">
                Hello
            </div>
        )
    }
}