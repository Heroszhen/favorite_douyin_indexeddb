
let form = document.getElementById("form-link");

document.addEventListener('alpine:init', () => {
    Alpine.data('douyin', () => ({
        conn: null,
        linkM: null,
        seriesM: null,
        keywords: "",

        section: null,
        modal: null,
        alllinks: [],
        elmindex: null,
        allseries: [],
        timer: null,
        canDelete: false,
        async init() {
            this.conn = await openDB();
            await wait(0.1);
            this.switchSection(1);
        },

        async switchSection(s) {
            if (this.section == s) return;
            this.$refs.input_search.value = "";
            this.section = s;
            if (s == 1) {
                this.alllinks = await getAll(this.conn, "link");
            }
            if (s == 2) {
                this.allseries = await getAll(this.conn, "series");
                console.log(this.allseries)
            }
        },
        async switchModal(m, index = null) {
            this.elmindex = index;
            if (m == 0) {
                this.modal = null;
                return;
            }
            if (this.section == 1) {
                this.linkM = new Link();
                if (index != null) {
                    this.linkM.set(this.alllinks[index]);
                }
                this.modal = 1;
            }
            if (this.section == 2) {
                this.seriesM = new Series();
                if (index != null) {
                    this.seriesM.set(this.allseries[index]);
                }
                this.modal = 2;
            }
        },
        async handleLinkMPhoto(e) {
            let file = e.target.files.item(0);
            let base64 = "";
            if (file.type.includes("image")) {
                base64 = await readFile(file);
                if (this.section == 1) {
                    this.linkM.file = file;
                    this.linkM.photo = base64;
                }
                if (this.section == 2) {
                    this.seriesM.photo = base64;
                }
            }
        },
        deleteLinkMPhoto() {
            document.getElementById("image-to-upload").src = "";
            this.linkM["photo"] = "";
            this.linkM["file"] = null;
        },
        async editLink(e) {
            e.preventDefault();
            if (this.linkM["id"] == null) {
                delete this.linkM["id"];
                let id = await add(this.conn, "link", clone(this.linkM));
                this.alllinks[this.alllinks.length] = await getById(this.conn, "link", id);
                this.switchModal(0);
            } else {
                await update(this.conn, "link", clone(this.linkM));
                this.alllinks[this.elmindex] = await getById(this.conn, "link", this.alllinks[this.elmindex]["id"]);
            }
            alert("Enregistré");
        },
        deleteLink(index) {
            if (!window.confirm("Voulez-vous supprimer ce lien?")) return;
            deleteById(this.conn, "link", this.alllinks[index]["id"]);
            this.alllinks.splice(index, 1);
        },
        sortByKeywords() {
            console.log(this.keywords)
            if (this.section == 1) {
                for (let entry of this.alllinks) {
                    if (entry['name'].toLowerCase().includes(this.keywords.toLowerCase())) entry["filter"] = "";
                    else entry["filter"] = "false";
                }
            }
            if (this.section == 2) {

            }
        },
        async editSeries(e) {
            e.preventDefault();
            if (this.seriesM["id"] == null) {
                delete this.seriesM["id"];
                this.seriesM["order"] = this.allseries.length + 1;
                let id = await add(this.conn, "series", clone(this.seriesM));
                this.allseries[this.allseries.length] = await getById(this.conn, "series", id);
                this.switchModal(0);
            } else {
                // await update(this.conn, "series", clone(this.seriesM));
                // this.allseries[this.elmindex] = await getById(this.conn, "series", this.allseries[this.elmindex]["id"]);
            }
            alert("Enregistré");
        },

        deleteOneSeries(index) {
            if (!window.confirm("Voulez-vous supprimer ce lien?")) return;
            deleteById(this.conn, "series", this.allseries[index]["id"]);
            this.allseries.splice(index, 1);
        },
        switchCanDelete() {
            if (this.canDelete == false) this.canDelete = true;
            else this.canDelete = false;
        }
    }))
})