/**
 * Returns an IDBDatabase that helps us to connect to our database
 * @returns {{Promise<object>} Promise object represents the object connection of the database
 */
function openDB() {
    let db = null;
    let openrequest = window.indexedDB.open("guidedouyin", 2);
    return new Promise((resolve, reject) => {
        openrequest.onupgradeneeded = function (event) {
            db = openrequest.result;
            if (!db.objectStoreNames.contains("link")) {
                db.createObjectStore("link", { keyPath: 'id', autoIncrement: true })
                    .createIndex('id', 'id', { unique: true });
            }
            if (!db.objectStoreNames.contains("series")) {
                db.createObjectStore("series", { keyPath: 'id', autoIncrement: true })
                    .createIndex('id', 'id', { unique: true });
            }
            resolve(db);
        }
        openrequest.onsuccess = function () {
            db = openrequest.result;
            resolve(db);
        }
    });
}


/**
 * Returns all elements of one objectStore
 * @param {object} db - connection
 * @param {string} table - the name of one objectStore
 * @returns {Promise<Array<object>>} Promise object represents the array containing all elements
 */
function getAll(db, table) {
    return new Promise((resolve, reject) => {
        let objectStore = db.transaction([table], "readonly").objectStore(table);
        let tab = [];
        objectStore.openCursor().onsuccess = function (event) {
            let cursor = event.target.result;
            if (cursor) {
                tab.push(JSON.parse(JSON.stringify(cursor.value)));
                cursor.continue();
            } else {
                resolve(tab);
            }
        }
    });
}


/**
 * Returns one elements according to it's id
 * @param {object} db - connection
 * @param {string} table - the name of one objectStore
 * @param {number} id - the id of this element
 * @returns {Promise<object>} Promise object represents the element found by id
 */
function getById(db, table, id) {
    return new Promise((resolve, reject) => {
        let request = db.transaction([table], "readonly")
            .objectStore(table)
            .index("id")
            .get(id);
        request.onsuccess = (e) => {
            resolve(request.result);
        }
    });
}

/**
 * Add one element without "id" in one objectStore
 * @param {object} db - connection
 * @param {string} table - the name of one objectStore
 * @param {object} data - the element we want to create in the database
 * @returns {Promise<number>} Promise object represents the id of the created element
 */
function add(db, table, data) {
    return new Promise((resolve, reject) => {
        let request = db.transaction([table], 'readwrite')
            .objectStore(table)
            .add(data);
        request.onsuccess = (e) => {
            resolve(request.result);
        }
    });
}

/**
 * Modify one element
 * @param {object} db - connection
 * @param {string} table - the name of one objectStore
 * @param {object} data - the element we want to update
 * @returns {Promise<number>} Promise object represents the id of the modified element
 */
function update(db, table, data) {
    return new Promise((resolve, reject) => {
        let request = db.transaction([table], 'readwrite')
            .objectStore(table)
            .put(data);
        request.onsuccess = (e) => {
            resolve(request.result);
        }
    });
}

/**
 * Delete one element according to it's id
 * @param {object} db - connection
 * @param {string} table - the name of one objectStore
 * @param {number} id - the id of the element
 * @returns {void}
 */
function deleteById(db, table, id) {
    db.transaction([table], 'readwrite')
        .objectStore(table)
        .delete(parseInt(id));
}
