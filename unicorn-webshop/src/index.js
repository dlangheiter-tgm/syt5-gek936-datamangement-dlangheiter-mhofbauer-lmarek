import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
var PouchDB = require('pouchdb');
var db = new PouchDB('my_db');
var remoteCouch = false;


/**
 * Adds Item to list
 * @param text
 */
function addShopping(text) {
    var sitem = {
        _id: new Date().toISOString(),
        title: text,
        completed: false
    };
    db.put(sitem, function callback(err, result) {
        if (!err) {
            console.log('Successfully added an item!');
        }
    });
}

/**
 * Deletes specific item from the list
 * @param shop
 */
function deleteButtonPressed(shop) {
    db.remove(shop);
}



