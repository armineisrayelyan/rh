import * as React from 'react';
import * as ReactDom from 'react-dom';
import {BrowserRouter } from 'react-router-dom';
import {Routes} from './routes'


ReactDom.render(
    <BrowserRouter>
        <Routes />
    </BrowserRouter>,
    document.getElementById('content')
);
