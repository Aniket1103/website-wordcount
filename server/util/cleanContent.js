const { convert } = require('html-to-text');

exports.cleanContent = htmlString => {
    options = {
        wordwrap : false,
        preserveNewlines : false
    }
    return convert(htmlString, options);
}