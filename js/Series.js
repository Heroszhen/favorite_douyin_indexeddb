class Series {
    id;
    name;
    url;
    created;
    filter = "";
    order = 0;
    photo = "";
    file = null;
    constructor(id = null, name = "", url = "", created = null) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.created = created;
        if (created == null) this.created = new Date();
    }

    set(data) {
        this.id = data["id"];
        this.name = data["name"];
        this.url = data["url"];
        this.created = data["created"];
        this.order = data["order"];
        this.photo = data["photo"];
    }
}