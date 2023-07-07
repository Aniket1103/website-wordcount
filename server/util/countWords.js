exports.countWords = async text => {
    // console.log(typeof text.spilt(" "));
    return text.replace(/[\n\r]+/g, ' ').trim().split(" ").length;
}