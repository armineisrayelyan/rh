import * as React from 'react';
import {Component} from 'react';
import {Link} from 'react-router-dom';

export class DBTable extends Component<any,any>{
    handleClick = (item)=>{
        let id = item.id;
        let xhttp = new XMLHttpRequest();
        let self = this;
        xhttp.onreadystatechange = function () {
            if(this.readyState == 4 && this.status == 200){
               self.state.list.splice(self.state.list.indexOf(item),1);
               self.setState({
                   list : self.state.list
               });
            }
        };
        xhttp.open("DELETE", `/ajax/data/delete/${id}`, true);
        xhttp.send();
    };

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
        xhttp.open("GET", "ajax/data/table", true);
        xhttp.send();
    }

    state = {
        list : []
    };

    private hotels = [];

    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2">
                        <Link to="/admin/add" className="btn btn-primary">Add hotels</Link>
                    </div>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>image</th>
                            <th>description</th>
                            <th>location</th>
                            <th>hairdryer</th>
                            <th>breakfast</th>
                            <th>fax</th>
                            <th>pool</th>
                            <th>fitness</th>
                            <th>roomservice</th>
                            <th>laundry</th>
                            <th>edit</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.list.map((item,i)=>{
                                return(
                                    <tr key={item.id || i}>
                                        <td>{item.name}</td>
                                        <td><img src={`/public/uploads/${item.image}`} style={{height:150}} /></td>
                                        <td>{item.description}</td>
                                        <td>{item.location}</td>
                                        <td>{item.hairdryer}</td>
                                        <td>{item.breakfast}</td>
                                        <td>{item.fax}</td>
                                        <td>{item.pool}</td>
                                        <td>{item.fitness}</td>
                                        <td>{item.roomservice}</td>
                                        <td>{item.laundry}</td>
                                        <td>
                                            <Link to={`/admin/edit/${item.id}`} className="btn btn-primary">edit</Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() =>{this.handleClick(item)}}>delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}