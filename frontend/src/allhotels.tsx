import * as React from 'react';
import {Component} from 'react';
import { BrowserRouter,Route,Switch,Redirect,Link} from 'react-router-dom';

export class AllHotels extends Component<any,any>{
    componentDidMount(){
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
        xhttp.open("GET", "ajax/data", true);
        xhttp.send();
    }
    private hotels = [];
    state = {
        list : []
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
                                            {item.name}
                                        </h3>
                                        <Link to={`/detail/${item.id}`} className="thumbnail">
                                            <img src={`/public/uploads/${item.image}`} />
                                        </Link>
                                    </div>
                                )
                            })
                        }
                </div>
            </div>
        )
    }
}