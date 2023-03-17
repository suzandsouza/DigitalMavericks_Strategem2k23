import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/base.scss"
import {routers} from "./utils/routes"
import { createBrowserRouter , RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(routers)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    <RouterProvider router={router}/>
  // </React.StrictMode>
);


