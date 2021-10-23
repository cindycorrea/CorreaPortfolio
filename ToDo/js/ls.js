
export default class StorageHelper {

    // default constructor when instantiated
    constructor(storage = window.localStorage) {
        this.storage = storage;
    }
    // Retrieves the item 'name' from local storage
    load(name) {
        return this.storage.getItem(name);
    }
    // Pushes key:value pair to local storage
    save(name, info) {
        this.storage.setItem(name, JSON.stringify(info));
    }
}