import * as React from 'react';
import {Component} from 'react';

export interface DetailProp {
    id:number|string
}
export interface DetailHotel{
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
}
export interface DetailState{
    hotel:DetailHotel
}

export class Detail extends Component<DetailProp,DetailState>{

    componentDidMount(){
        let id = this.props.id;
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
        hotel : {}
    };

    render(){
        let hotel:DetailHotel = this.state.hotel;
        return(
            <div className="container">
                <div className="detaildesc">
                    <div className="row">
                        <div className="col-sm-6">
                            <a href="javascript:;" className="thumbnail">
                                <img src={`/public/uploads/${hotel.image}`} />
                            </a>
                        </div>
                        <div className="col-sm-6">
                            <p className="hotelname">{hotel.name}</p>
                            <p>{hotel.text}</p>
                            <div className="icons">
                                <i className="fa fa-wifi wf" aria-hidden="true"> Free WiFi</i>
                                <i className="fa fa-taxi wf" aria-hidden="true"> Airport shuttle</i>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-9 chboxicons">
                        <div className="row">
                            <div className="col-sm-4">
                                <h3>Bathroom</h3>
                                <p><i className="fa fa-check-square-o" aria-hidden="true" /> Bath or Shower</p>
                                <p><i className="fa fa-check-square-o" aria-hidden="true" /> Toilet</p>
                                {
                                    (()=>{
                                        if(hotel.hairdryer){
                                            return <p><i className="fa fa-check-square-o" aria-hidden="true" /> Hairdrye</p>
                                        }else {
                                            return <p><i className="fa fa-square-o" aria-hidden="true" /> Hairdryer</p>
                                        }
                                    })()
                                }
                            </div>
                            <div className="col-sm-4">
                                <h3>{'Food & Drink'}</h3>
                                {
                                    (()=>{
                                        if(hotel.breakfast){
                                            return <p><i className="fa fa-check-square-o" aria-hidden="true" /> Breakfast in the room</p>
                                        }else {
                                            return <p><i className="fa fa-square-o" aria-hidden="true" /> Breakfast in the room</p>
                                        }
                                    })()
                                }
                                <p><i className="fa fa-check-square-o" aria-hidden="true" /> Bar</p>
                            </div>
                            <div className="col-sm-4">
                                <h3>Business facilities</h3>
                                {
                                    (()=>{
                                        if(hotel.fax){
                                            return <p><i className="fa fa-check-square-o" aria-hidden="true" /> Fax/photocopying</p>
                                        }else {
                                            return <p><i className="fa fa-square-o" aria-hidden="true" /> Fax/photocopying</p>
                                        }
                                    })()
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                                <h3>Pool and wellness</h3>
                                {
                                    (()=>{
                                        if(hotel.pool){
                                            return <p><i className="fa fa-check-square-o" aria-hidden="true" /> Indoor pool (all year)</p>
                                        }else {
                                            return <p><i className="fa fa-square-o" aria-hidden="true" /> Indoor pool (all year)</p>
                                        }
                                    })()
                                }
                                <p><i className="fa fa-check-square-o" aria-hidden="true" /> Spa and wellness centre</p>
                                <p><i className="fa fa-check-square-o" aria-hidden="true" /> Sauna</p>
                                {
                                    (()=>{
                                        if(hotel.fitness){
                                            return <p><i className="fa fa-check-square-o" aria-hidden="true" /> Fitness centre</p>
                                        }else {
                                            return <p><i className="fa fa-square-o" aria-hidden="true" /> Fitness centre</p>
                                        }
                                    })()
                                }
                            </div>
                            <div className="col-sm-4">
                                <h3>General</h3>
                                <p><i className="fa fa-check-square-o" aria-hidden="true" /> Air conditioning</p>
                                <p><i className="fa fa-check-square-o" aria-hidden="true" /> Lift</p>
                                {
                                    (()=>{
                                        if(hotel.roomservice){
                                            return <p><i className="fa fa-check-square-o" aria-hidden="true" /> Room service</p>
                                        }else {
                                            return <p><i className="fa fa-square-o" aria-hidden="true" /> Room service</p>
                                        }
                                    })()
                                }
                            </div>
                            <div className="col-sm-4">
                                <h3>Cleaning services</h3>
                                <p><i className="fa fa-check-square-o" aria-hidden="true" /> Dry cleaning</p>
                                <p><i className="fa fa-check-square-o" aria-hidden="true" /> Ironing service</p>
                                {
                                    (()=>{
                                        if(hotel.laundry){
                                            return <p><i className="fa fa-check-square-o" aria-hidden="true" /> Laundry</p>
                                        }else {
                                            return <p><i className="fa fa-square-o" aria-hidden="true" /> Laundry</p>
                                        }
                                    })()
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                                <h3>Languages spoken</h3>
                                <p><i className="fa fa-check-square-o" aria-hidden="true" /> Russian</p>
                                <p><i className="fa fa-check-square-o" aria-hidden="true" /> English</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}