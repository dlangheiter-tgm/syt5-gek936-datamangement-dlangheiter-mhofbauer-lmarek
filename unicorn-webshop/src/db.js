import PouchDB from 'pouchdb';
const db = new PouchDB('my_db');
const remoteCouch = new PouchDB('http://redt6a.thekingdave.com:5984/shopping-list');

/**
 * Creates Item in the DB
 * @param text Name of the Shopping-List-Item
 */
function createItem(text) {
    var shopItem = {
        _id: new Date().toISOString(),
        title: text,
        commentary: text,
        completed: false
    };
    db.put(shopItem, function callback(err, result) {
        if (!err) {
            console.log('Successfully added an item!');
        }
    });
}

/**
 * Deletes specific item from the DB
 * @param shopItem Shopping-List-Item
 */
function deleteItem(shopItem) {
    db.remove(shopItem);
}


/**
 * If the checkbox-status of an item changes, the item will be changed
 * @param shopItem Shopping-List-Item
 * @param completed
 */
function checkboxChanged(shopItem, completed) {
    shopItem.completed = completed;
    db.put(shopItem);
}

/**
 * Updates all changes to the DB and takes all the changes from the central-remote-DB
 */
function sync() {
    var opts = {live: true};
    db.replicate.to(remoteCouch, opts);
    db.replicate.from(remoteCouch, opts);
}

/**
 * Changes the Title of an item
 * @param shopItem Shopping-List-Item
 * @param newTitle The new Title for the Shopping-List-Item
 */
function updateTitle(shopItem, newTitle) {
    shopItem.title = newTitle;
    db.put(shopItem);
}

function updateAmount(shopItem, newCommentary) {
    shopItem.commentary = newCommentary;
    db.put(shopItem);
}


