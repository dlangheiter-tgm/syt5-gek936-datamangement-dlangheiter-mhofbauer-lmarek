
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
function deleteButtonPressed(sitem) {
    db.remove(sitem);
}


function checkboxChanged(sitem, event) {
    sitem.completed = event.target.checked;
    db.put(todo);
}

function resetShoppingList(sitem, event) {
    var trimmedText = event.target.value.trim();
    if (!trimmedText) {
        db.remove(sitem);
    } else {
        sitem.title = trimmedText;
        db.put(sitem);
    }
}