import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import AuctionPageSeller from './auctionpageseller';

ReactDOM.render(
    <BrowserRouter>
        <AuctionPageSeller />
    </BrowserRouter>, 
    document.getElementById('root')
);