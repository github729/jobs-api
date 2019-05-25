var multer = require('multer');
var md5 = require('md5');
let utils = module.exports = {
    assestDest: (dir) => {
        return multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, 'uploads/' + dir);
            },
            filename: function (req, file, callback) {

                callback(null, md5(Date.now()) + '-' + file.originalname);

            }
        });
    },

    extractImgs: (rawString) => {
        var regex = /<img.*?src="(.*?)"/gi, result,
            urls = [];
        while ((result = regex.exec(rawString))) {

            urls.push(result[1].replace(config.domain, ""));
        }
        // urls = map(image => image.replace(config.domain,""));
        return urls;
    },

}