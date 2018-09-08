import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import App from './App'; //Importing over the App Component
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root')); //Rendering out the App Component to the element 'root'
registerServiceWorker();
