import * as React from 'react';
import {Component} from 'react';
import { BrowserRouter,Route,Switch,Redirect,Link} from 'react-router-dom';
import {UTILS} from "../utils";

export class AllHotels extends Component<any,any>{
    componentDidMount(){
        let xhttp = new XMLHttpRequest();
        let self = this;
        xhttp.onreadystatechange = function () {
            if(this.readyState == 4 && this.status == 200){
                self.hotelsCount = JSON.parse(this.responseText).data;
                self.hotels = JSON.parse(this.responseText).hotels;
                self.setState({
                    list : self.hotels
                })
            }
        };
        xhttp.open("GET", "ajax/data", true);
        xhttp.send();
    }
    private hotels = [];
    private hotelsCount = [];
    state = {
        list : []
    };
    handleClick = () =>{
        let xhttp = new XMLHttpRequest();
        let self = this;
        let skip = self.state.list.length;
        xhttp.onreadystatechange = function () {
            if(this.readyState == 4 && this.status == 200){
                self.hotels = self.hotels.concat(JSON.parse(this.responseText));
                self.setState({
                    list : self.hotels
                })
            }
        };
        xhttp.open("GET", `ajax/data/all?skip=${skip}`, true);
        xhttp.send();
    };

    render(){
        return(
            <div className="container home">
                <div className="row">
                        {
                            this.state.list.map((item,i)=>{
                                return(
                                    <div key={item.id || i} className="col-sm-4">
                                        <h3 className="title">
                                            {UTILS.normalizeText(item.name)}
                                        </h3>
                                        <Link to={`/detail/${item.id}`} className="thumbnail">
                                            <img src={`/public/uploads/${item.image}`} style={{
                                                height : 188
                                            }} />
                                        </Link>
                                    </div>
                                )
                            })
                        }
                </div>
                {
                    (()=>{
                       if(this.state.list.length < this.hotelsCount.length){
                           return(
                                <div className="row">
                                    <button className="col-sm-offset-6 btn btn-info" onClick={this.handleClick}>see more >></button>
                                </div>
                           )
                       }
                    })()
                }

            </div>
        )
    }
}