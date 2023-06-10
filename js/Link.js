/** @class Link
 * @property {number} id  
 * @property {string} photo
 * @property {string} description
 */
class Link {
    id;
    photo = "";
    description = "";
    file = null;
    hidden = 0;
    filter = "";

    /**
     * @param {string} name 
     * @param {string} url 
     */
    constructor(name = "", url = "") {
        /**
         * @property {string} name - the name of the channel
         */
        this.name = name;
        /**
         * @property {string} url  - one video's url
         */
        this.url = url;
        /**
         * @property {Date} created
         */
        this.created = new Date();
    }

    /** 
     * @property {Function} set information
     * @param {object} data - one object containing information
     * @returns void
     */
    set(data) {
        this.id = data["id"];
        this.url = data["url"];
        this.name = data["name"];
        this.photo = data["photo"];
        this.description = data["description"];
        this.created = data["created"];
    }
}