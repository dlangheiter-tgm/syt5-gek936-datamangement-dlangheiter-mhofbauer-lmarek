import PouchDB from 'pouchdb';
export const db = new PouchDB('my_db');
const remoteCouch = new PouchDB('https://couch.redt6a.thekingdave.com/shopping-list');

/**
 * Creates Item in the DB
 * @param title Title of the Shopping-List-Item
 * @param commentary Comment of the Shopping-List-Item
 */
export function createItem(title, commentary="") {
    const shopItem = {
        _id: new Date().toISOString(),
        title,
        commentary,
        completed: false
    };
    db.put(shopItem);
}

/**
 * Deletes specific item from the DB
 * @param shopItem Shopping-List-Item
 */
export function deleteItem(shopItem) {
    db.remove(shopItem);
}

/**
 * Updates all changes to the DB and takes all the changes from the central-remote-DB
 */
export function sync() {
    return db.sync(remoteCouch, {live: true, retry: true});
}

/**
 * Updates an Shopping-List-Item;
 * @param shopItem The new shop item. (with _id and _rev)
 */
export function updateEntry(shopItem) {
    db.put(shopItem);
}
