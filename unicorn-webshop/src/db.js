
var PouchDB = require('pouchdb');
var db = new PouchDB('my_db');
var remoteCouch = false;


/**
 * Adds Item to list
 * @param text
 */
function addShopping(text) {
    var shopItem = {
        _id: new Date().toISOString(),
        title: text,
        completed: false
    };
    db.put(shopItem, function callback(err, result) {
        if (!err) {
            console.log('Successfully added an item!');
        }
    });
}

/**
 * Deletes specific item from the list
 * @param shop
 */
function deleteButtonPressed(shopItem) {
    db.remove(shopItem);
}


function checkboxChanged(shopItem, completed) {
    shopItem.completed = completed;
    db.put(shopItem);
}

function sync() {
    syncDom.setAttribute('data-sync-state', 'syncing');
    var opts = {live: true};
    db.replicate.to(remoteCouch, opts, syncError);
    db.replicate.from(remoteCouch, opts, syncError);
}





