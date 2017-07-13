import * as React from 'react'
import {Component} from 'react'

export interface EditProp {
    hotel : EditHotel
}
export interface EditHotel{
    name?:string
    text?:string
    breakfast?:number
    hairdryer?:number
    fax?:number
    pool?:number
    fitness?:number
    roomservice?:number
    laundry?:number
    location?:string
    description?:string
    image?:any
    id?:number
}
export interface EditState{
    hotel : EditHotel
}

export class EditDeck extends Component<EditProp,EditState>{

    render(){
        let hotel:EditHotel = this.props.hotel;
        return(
            <div className="container-fluid">
                <div className="row">
                    <form action={`/update/${hotel.id}`} method="post" className="form-horizontal" encType="multipart/form-data">
                        <div className="col-sm-4">
                            <div className="form-group">
                                <label className="control-label col-sm-3" htmlFor="name">Name:</label>
                                <div className="col-sm-9">
                                    <input type="text" name="name" className="form-control" id="name"  defaultValue={hotel.name} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-3" htmlFor="location">Location:</label>
                                <div className="col-sm-9">
                                    <input type="text" name="location" className="form-control" id="location" defaultValue={hotel.location} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-3" htmlFor="image">Image:</label>
                                <div className="col-sm-9">
                                    <img src={`/public/uploads/${hotel.image}`} height="150"/>
                                    <input type="file" name="image" width="50" />
                                </div>
                            </div>
                            <div className="row ">
                                <div className="col-sm-6">
                                    <div className="checkbox">
                                        {
                                            (()=>{
                                                if(hotel.breakfast == 1){
                                                    return <label><input type="checkbox" value="1" name="breakfast" defaultChecked />Breakfast</label>
                                                }else {
                                                    return <label><input type="checkbox" value="1" name="breakfast" />Breakfast</label>
                                                }
                                            })()
                                        }
                                    </div>
                                    <div className="checkbox">
                                        {
                                            (()=>{
                                                if(hotel.pool == 1){
                                                    return <label><input type="checkbox" value="1" name="pool" defaultChecked />Indoor pool</label>
                                                }else {
                                                    return <label><input type="checkbox" value="1" name="pool" />Indoor pool</label>
                                                }
                                            })()
                                        }
                                    </div>
                                    <div className="checkbox">
                                        {
                                            (()=>{
                                                if(hotel.fitness == 1){
                                                    return <label><input type="checkbox" value="1" name="fitness" defaultChecked/>Fitness</label>
                                                }else {
                                                    return <label><input type="checkbox" value="1" name="fitness"/>Fitness</label>
                                                }
                                            })()
                                        }
                                    </div>
                                    <div className="checkbox">
                                        {
                                            (()=>{
                                                if(hotel.fax == 1){
                                                    return <label><input type="checkbox" value="1" name="fax" defaultChecked/>Fax/photocopying</label>
                                                }else {
                                                    return <label><input type="checkbox" value="1" name="fax"/>Fax/photocopying</label>
                                                }
                                            })()
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="checkbox">
                                        {
                                            (()=>{
                                                if(hotel.roomservice == 1){
                                                    return <label><input type="checkbox" value="1" name="roomservice" defaultChecked/>Room service</label>
                                                }else {
                                                    return <label><input type="checkbox" value="1" name="roomservice"/>Room service</label>
                                                }
                                            })()
                                        }
                                    </div>
                                    <div className="checkbox">
                                        {
                                            (()=>{
                                                if(hotel.hairdryer == 1){
                                                    return <label><input type="checkbox" value="1" name="hairdryer" defaultChecked/>Hairdryer</label>
                                                }else {
                                                    return <label><input type="checkbox" value="1" name="hairdryer"/>Hairdryer</label>
                                                }
                                            })()
                                        }
                                    </div>
                                    <div className="checkbox">
                                        {
                                            (()=>{
                                                if(hotel.laundry == 1){
                                                    return  <label><input type="checkbox" value="1" name="laundry" defaultChecked/>Laundry</label>
                                                }else {
                                                    return <label><input type="checkbox" value="1" name="laundry"/>Laundry</label>
                                                }
                                            })()
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <div className="form-group">
                                <label className="control-label col-sm-2" htmlFor="text">text:</label>
                                <div className="col-sm-10">
                                    <textarea  name="text" className="form-control" id="text" rows={6} defaultValue={hotel.text} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2" htmlFor="text">description:</label>
                                <div className="col-sm-10">
                                    <textarea  name="description" className="form-control" id="description" rows={4} defaultValue={hotel.description}/>
                                </div>
                            </div>
                            <div className="col-sm-offset-11 col-sm-1">
                                <input type="submit" className="btn btn-info" value="Update"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}