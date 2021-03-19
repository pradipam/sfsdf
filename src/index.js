import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Mystore from './practice/store/store';
import {Provider} from 'react-redux';

const store = Mystore();

const jsx= (
    <Provider store={store}>
       <App />          
    </Provider>
)
console.log(store.getState())
ReactDOM.render(jsx, document.getElementById('root'));