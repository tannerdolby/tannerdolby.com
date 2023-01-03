const fs = require('fs/promises');

async function readFile(filePath, encoding='utf-8') {
    try {
        return await fs.readFile(filePath, { encoding: encoding });
    } catch (err) {
        throw err;
    }
}

async function writeFile(filePath, data) {
    try {
        return await fs.writeFile(filePath, data);
    } catch (err) {
        throw err;
    }
}

// https://codepen.io/tannerdolby/pen/MWvyjQQ?editors=1010 :)
// Accessing book covers from https://openlibrary.org/dev/docs/api/covers
class OpenLib {
    constructor() {
      this.rootUrl = "https://covers.openlibrary.org";
    }
    
    // Get a single book cover image url
    async getCover(key, value, size) {
      const apiUrl = `${this.rootUrl}/b/${key}/${value}-${size}.jpg`;
      const response = await fetch(apiUrl);
      return response["status"] == 200 ? response["url"] : { "message": "Request failed", "response": response };
    }
    
    // Get a list of book cover image urls
    async getCovers(coversObjList) {
      let covers = [];
      coversObjList.forEach(cover => {
        const { key, id, size } = cover;
        const response = this.getCover(key, id, size);
        covers.push(response);
      });

      return await Promise.all(covers);
    }
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
}

module.exports = {
    readFile,
    writeFile,
    OpenLib,
    random
};
