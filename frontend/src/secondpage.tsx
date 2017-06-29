import * as React from 'react';
import {Component} from 'react';
import {Header} from './header';
import {SecondSearch} from './secondsearch';
import {SearchedHotels} from './searchedhotels'
import {renderToStaticMarkup} from "react-dom/server";

export class SecondPage extends Component<any,any>{

    render(){
        return(
            <div>
                <Header />
                <div className="container">
                    <div className="row">
                        <SecondSearch />

                        <SearchedHotels params = {new URLSearchParams(this.props.location.search)}/>
                    </div>
                </div>

            </div>
        )
    }
}