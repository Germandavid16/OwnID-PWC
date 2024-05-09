import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { OwnIDInit } from '@ownid/react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {Account} from "./Account.tsx";
import {ROUTES} from "./routes.ts";
import {RegisterComponent} from "./Register.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: ROUTES.account,
        element: <Account />
    },
    {
        path: ROUTES.register,
        element: <RegisterComponent />
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <OwnIDInit
          config={{ appId: 'j7rmsulhvvno8o' }}
      />
      <RouterProvider router={router} />
  </React.StrictMode>,
)
