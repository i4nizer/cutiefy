const multer = require('multer')



//# path & name setting
const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            const imageTypes = /png|jpeg|svg|webp/
            const audioTypes = /mp3|wav|audio|mpeg/

            if (imageTypes.test(file.mimetype)) cb(null, 'public/thumbnails/')
            else if (audioTypes.test(file.mimetype)) cb(null, 'public/songs/')
            else cb(null, 'maliciousfiles/')
        },
        filename: (req, file, cb) => cb(null, file.originalname)
    }
)

//# file filtering
const fileFilter = (req, file, cb) => {
    const fileTypes = /mp3|wav|audio|mpeg|image|png|jpeg|svg|webp/;
    const mimetype = fileTypes.test(file.mimetype)

    const isFileAllowed = mimetype
    cb(null, isFileAllowed)
    req.isFileSaved = isFileAllowed
}

//# set config
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})



module.exports = upload