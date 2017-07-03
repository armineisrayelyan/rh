import * as React from 'react';
import {Component} from 'react';
import { BrowserRouter,Route,Switch,Redirect,Link} from 'react-router-dom';
import {json} from "body-parser";

export class SearchedHotels extends Component<any,any>{

    componentDidMount(){
        this.request();
    }
    componentWillReceiveProps(){
        this.request();
    }
    request(){
        let xhttp = new XMLHttpRequest();
        let self = this;
        xhttp.onreadystatechange = function () {
            if(this.readyState == 4 && this.status == 200){
                self.hotels = JSON.parse(this.responseText);
                self.setState({
                    list : self.hotels
                })
            }
        };
        xhttp.open("GET", `ajax/data/searched${this.props.search}`, true);
        xhttp.send();
    }
    private hotels = [];
    state = {
        list : []
    };
    render(){
        return(
            <div className="col-sm-8">
                {
                    this.state.list.map((item,i)=>{
                        return(
                            <div key={item.id || i}  className="row">
                                <div className="col-md-5">
                                    <Link to={`/detail/${item.id}`} className="thumbnail">
                                        <img src={`/public/uploads/${item.image}`} />
                                    </Link>
                                </div>
                                <div className="col-md-7">
                                    <a href="javascript:;">
                                        <h3 className="title">{item.name}</h3>
                                    </a>
                                    <p>
                                        {item.description}
                                        <Link to={`/detail/${item.id}`}>more...</Link>
                                    </p>
                                    <div className="location">
                                        <i className="fa fa-map-marker" aria-hidden="true" />
                                        <a href="javascript:;">
                                            {item.location}
                                        </a>
                                    </div>
                                    <div className="booking">
                                        <button type="button" id="booking" className="btn btn-primary">
                                        <a href="" data-toggle="modal" data-target="#LoginModal">to book</a>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}