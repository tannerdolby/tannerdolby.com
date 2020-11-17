/* Cache a Remote Image */

const CacheAsset = require('@11ty/eleventy-cache-assets');

// save the Buffer information from Sharp here to return an object
// that can be accessed in a template {{ }}

module.exports = () => {
    console.log("Attempting to do image magic!");

    let url = "";
    // let imgBuffer = await CacheAsset(url, {
    //     duration: "1d",
    //     type: "buffer"
    // });
    // use imgBuffer as an input to the sharp plugin

};
