import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import store from './store'
import { routes } from './routes/AllRoutes';
import 'react-toastify/dist/ReactToastify.css';

// import dotenv from 'dotenv'
// dotenv.config()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <BrowserRouter>
  {/* <RouterProvider router={routes}> */}
    <App />
    {/* </RouterProvider> */}
  </BrowserRouter>
  </Provider>
);

