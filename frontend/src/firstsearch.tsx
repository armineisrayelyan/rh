import * as React from 'react';
import {Component} from 'react';

export class FirstSearch extends Component<any,any>{
    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.navigator(`/search?q=${(document.getElementById('searchitem') as any).value}`);
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="searchbox">
                            <form onSubmit={this.handleSubmit}>
                                <div className="marginlable" >
                                    <label className="searchlable">
                                        Destination, property name or address:
                                    </label>
                                    <div>
                                        <input type="text" name="q" id="searchitem" placeholder="Search place..." />
                                    </div>
                                </div>
                                <div className="row chekinout">
                                    <div className="col-md-6 checkinoutlable">
                                        <div className="date marginlable">
                                            <label className="searchlable">
                                                Check-in
                                            </label>
                                            <div className="calendar">
                                                <i className="fa fa-calendar-plus-o icon" aria-hidden="true"/>
                                                <input type="date" id="checkin" placeholder="check-in date" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 checkinoutlable">
                                        <div className="date marginlable">
                                            <label className="searchlable">
                                                Check-out
                                            </label>
                                            <div className="calendar">
                                                <i className="fa fa-calendar-plus-o icon" aria-hidden="true" />
                                                <input type="date" id="checkout" placeholder="check-out date" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row searchbutton">
                                    <button type="submit" id="search" className="btn btn-primary">Search</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-6">

                    </div>
                </div>

            </div>
        )
    }
}