import * as React from 'react';
import {Component} from 'react';
import { BrowserRouter,Route,Switch,Redirect,Link} from 'react-router-dom';
import * as ReactDOM from 'react-dom';

export class Header extends Component<any,any>{
    handleSubmit = (e) =>{
        e.preventDefault();
        let data:any = new FormData(document.getElementById('loginForm') as any);
        let q:any = {};
        data.forEach((v,k)=>{
            q[`${k}`] = v
        });
        let xhttp = new XMLHttpRequest();
        let self = this;
        xhttp.onreadystatechange = function () {
            if(this.readyState == 4 && this.status == 200){
                if(JSON.parse(this.responseText).errors){
                    self.setState({
                        massage : JSON.parse(this.responseText).errors
                    })
                }else{
                    window.location.reload();
                }
            }
        };
        xhttp.open("POST", "/ajax/login", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(q));
    };
    handleRegSubmit = (e) =>{
        e.preventDefault();
        let inputs = document.querySelector('#regsubmit')
            .querySelectorAll('[name]') as any;
        let obj = {};
        inputs.forEach(function (element:any) {
            if(element.value == ""){
                obj[element.getAttribute('name')] = "absent";

            }
        });
        this.setState({
            errors : obj
        })
    };

    state = {
        massage: "",
        errors: {
            firstname: "",
            lastname: "",
            email: "",
            password: ""
        }
    };


    render(){
        return(
            <div>
                <div className="main">
                    <div className="topname">
                        <h1 className="titlename">
                            <Link to = "/" className="titl">
                                Hotels.am
                            </Link>
                        </h1>
                    </div>
                    <div className="reglog">
                        {
                            (()=>{
                                if(!(window as any).sessionUser){
                                    return(
                                        <div className="topbuttons">
                                            <a className="ateg" href="" data-toggle="modal" data-target="#RegistrationModal">Registration</a>
                                        </div>
                                    )
                                }
                            })()
                        }
                        <div className="topbuttons">
                            {
                                (()=>{
                                   if((window as any).sessionUser){
                                       return <a className="ateg" href="/logout">Log out</a>
                                   }
                                   return <a className="ateg" href="" data-toggle="modal" data-target="#LoginModal" >Log in</a>
                                })()
                            }
                        </div>
                    </div>
                </div>
                <div className="container home">
                    <div id="LoginModal" className="modal fade" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content login">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Login</h4>
                                </div>
                                <div className="modal-body">

                                    <form className="form-horizontal"  role="form"  id="loginForm" onSubmit={this.handleSubmit}>
                                        <input type="hidden" name="redirect" value={window.location.href} />
                                        <div className="form-group">
                                            <label htmlFor ="email" className="control-label col-sm-4">Email or Phone</label>
                                            <div className="col-sm-12">
                                                <input type="email" name="email" className="form-control" id="email" placeholder="Email or Phone" autoFocus={true}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor ="password" className="control-label col-sm-2">Password</label>
                                            <div className="col-sm-12">
                                                <input type="password" name="password" className="form-control" id="password" placeholder="Password"/>
                                            </div>
                                        </div>
                                        {
                                            (()=>{
                                               if(this.state.massage != ""){
                                                   return(
                                                       <p style={{color:"red"}}>{this.state.massage}</p>
                                                   )
                                               }
                                            })()
                                        }
                                        <div className="row">
                                            <div className="col-sm-offset-2">
                                                <div className="col-sm-8 logcheck">
                                                    <div className="checkbox">
                                                        <label><input type="checkbox" defaultChecked/>Keep me logged in</label>
                                                    </div>
                                                    <a href="#">Forgot your password?</a>
                                                </div>
                                                <div className="col-sm-4">
                                                    <input type="submit" className="btn btn-info" value="Login"/>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                                <div className="modal-footer first">
                                    <a href="#">
                                        <i className="fa fa-facebook-official fa-2x" />
                                    </a>
                                    <a href="#" className="twitter">
                                        <i className="fa fa-twitter-square fa-2x" />
                                    </a>
                                    <a href="#" className="google-plus">
                                        <i className="fa fa-google-plus-square fa-2x" />
                                    </a>
                                    <a href="#" className="odnoklassniki">
                                        <i className="fa fa-odnoklassniki-square fa-2x" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="RegistrationModal" className="modal fade" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Registration</h4>
                                </div>
                                <form method="post" action="/registration"  id="regsubmit" onSubmit={this.handleRegSubmit}>
                                    <div className="modal-body" >

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" name="firstname"  placeholder="First name" style={this.state.errors.firstname == 'absent' ? {borderColor:"red"} : {}}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" name="lastname"  placeholder="Last name" style={this.state.errors.lastname == 'absent' ? {borderColor:"red"} : {}}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input type="email" className="form-control bord" name="email"  placeholder="Mobile number or email" style={this.state.errors.email == 'absent' ? {borderColor:"red"} : {}}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input type="password" className="form-control bord" name="password" placeholder="Password" style={this.state.errors.password == 'absent' ? {borderColor:"red"} : {}}/>
                                                        </div>
                                                        {
                                                            (()=>{
                                                                let key:string;
                                                                let errors = this.state.errors;
                                                                for (key in errors){
                                                                    if(errors[key] == 'absent'){
                                                                        return (
                                                                            <div style={{color:"red"}}>Please fill in this fields</div>
                                                                        )
                                                                    }
                                                                }
                                                            })()
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="modal-footer">
                                        <input type="submit" value="Sing Up"  className="btn btn-info"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}