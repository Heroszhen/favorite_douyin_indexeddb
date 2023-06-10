function wait(seconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
        }, seconds * 1000);
    });
}

function clone(object) {
    return JSON.parse(JSON.stringify(object));
}

function readFile(file_dom) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file_dom);
        reader.onload = e => {
            resolve(e.target.result);
        };
    });
}

function getDatas() {
    return [];
}

/**
 * @param {File} file 
 * @return {Promise<Blob>}
 */
async function convertFileToBlob(file) {
    let base64 = await readFile(file);
    return new Blob([base64], { type: "image/png" });

}