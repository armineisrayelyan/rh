import * as React from 'react'
import {Component} from 'react'

export class AddDeck extends Component<any,any>{
    render(){
        return(
            <div className='container-fluid'>
                <form action="/create" method="post" className="form-horizontal" encType="multipart/form-data">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="name">Name:</label>
                            <div className="col-sm-9">
                                <input type="text" name="name" className="form-control" id="name" placeholder="Enter hotel's name"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="location">Location:</label>
                            <div className="col-sm-9">
                                <input type="text" name="location" className="form-control" id="location" placeholder="Enter hotel's location"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="image">Image:</label>
                            <div className="col-sm-9">
                                <input type="file" name="image" width="50"/>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-sm-6">
                                <div className="checkbox">
                                    <label><input type="checkbox" value="1" name="breakfast"/>Breakfast</label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value="1" name="pool"/>Indoor pool</label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value="1" name="fitness"/>Fitness</label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value="1" name="fax"/>Fax/photocopying</label>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="checkbox">
                                    <label><input type="checkbox" value="1" name="roomservice"/>Room service</label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value="1" name="hairdryer"/>Hairdryer</label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value="1" name="laundry"/>Laundry</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="text">text:</label>
                            <div className="col-sm-10">
                                <textarea  name="text" className="form-control" id="text" placeholder="Text about hotel" rows={6}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="text">description:</label>
                            <div className="col-sm-10">
                                <textarea  name="description" className="form-control" id="description" placeholder="Hotel's description" rows={4}/>
                            </div>
                        </div>
                        <div className="col-sm-offset-11 col-sm-1">
                            <input type="submit" className="btn btn-info" value="Crate"/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}