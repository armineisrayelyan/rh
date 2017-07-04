import * as React from 'react';
import {Component} from 'react';
import { BrowserRouter,Route,Switch,Redirect,Link} from 'react-router-dom';

export class Header extends Component<any,any>{

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
                                   return <a className="ateg" href="" data-toggle="modal" data-target="#LoginModal">Log in</a>
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

                                    <form className="form-horizontal"  role="form" method="post" action="/login">
                                        <input type="hidden" name="redirect" value={window.location.href} />
                                        <div className="form-group">
                                            <label htmlFor ="email" className="control-label col-sm-4">Email or Phone</label>
                                            <div className="col-sm-12">
                                                <input type="email" name="email" className="form-control" id="email" placeholder="Email or Phone"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor ="password" className="control-label col-sm-2">Password</label>
                                            <div className="col-sm-12">
                                                <input type="password" name="password" className="form-control" id="password" placeholder="Password"/>
                                            </div>
                                        </div>
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
                                <form method="post" action="/registration"  id="regsubmit">
                                    <div className="modal-body" >

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" name="firstname" id="firstname" placeholder="First name"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" name="lastname" id="lastname" placeholder="Last name"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input type="email" className="form-control bord" name="email" id="regemail" placeholder="Mobile number or email"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input type="password" className="form-control bord" name="password" id="regpassword" placeholder="Password"/>
                                                        </div>
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