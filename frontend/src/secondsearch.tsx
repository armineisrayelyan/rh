import * as React from 'react';
import {Component} from 'react';

export class SecondSearch extends Component<any,any>{
    render (){
        return(

                    <div className="col-sm-4">
                        <div className="searchbox">
                            <form method="get" action="/search">
                                <div className="marginlable" >
                                    <label className="searchlable">
                                        Destination, property name or address:
                                    </label>
                                    <div>
                                        <input type="text" name="q" id="searchitem" placeholder="Search place..." />
                                    </div>
                                </div>

                                <div className="checkinlable">
                                    <div className="date marginlable">
                                        <label className="searchlable">
                                            Check-in
                                        </label>
                                        <div className="calendarsearch">
                                            <i className="fa fa-calendar-plus-o icon" aria-hidden="true" />
                                            <input type="date" id="checkin" placeholder="check-in date" />
                                        </div>
                                    </div>
                                </div>
                                <div className="checkinlable">
                                    <div className="date marginlable">
                                        <label className="searchlable">
                                            Check-out
                                        </label>
                                        <div className="calendarsearch">
                                            <i className="fa fa-calendar-plus-o icon" aria-hidden="true" />
                                            <input type="date" id="checkin" placeholder="check-in date" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row checkin">
                                    <div className="col-sm-6">
                                        <div className="checkbox">
                                            <label><input type="checkbox" value="1" name="breakfast" />Breakfast</label>
                                        </div>
                                        <div className="checkbox">
                                            <label><input type="checkbox" value="1" name="pool" />Indoor pool</label>
                                        </div>
                                        <div className="checkbox">
                                            <label><input type="checkbox" value="1" name="fitness" />Fitness</label>
                                        </div>
                                        <div className="checkbox">
                                            <label><input type="checkbox" value="1" name="laundry" />Laundry</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="checkbox">
                                            <label><input type="checkbox" value="1" name="roomservice" />Room service</label>
                                        </div>
                                        <div className="checkbox">
                                            <label><input type="checkbox" value="1" name="hairdryer" />Hairdryer</label>
                                        </div>
                                        <div className="checkbox">
                                            <label><input type="checkbox" value="1" name="fax" />Fax/photocopying</label>
                                        </div>
                                    </div>
                                </div>


                                <div className="row searchbutton">
                                    <button type="submit" id="search" className="btn btn-primary">Search</button>
                                </div>
                            </form>
                        </div>
                    </div>

        )
    }
}