const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

exports.upload = async (req, res) => {
    try {
        let result = await cloudinary.v2.uploader.upload(req.body.image, {
            public_id: `${Date.now()}`,
            resource_type: 'auto'
        })   // we send json data!

        console.log(result)
        res.json({
            public_id: result.public_id,
            url: result.secure_url
        })

    } catch (err) {
        console.log(err);
        res.status(400).send("upload image failed");

    }
};

exports.remove = (req, res) => {
    let image_id = req.body.public_id
    cloudinary.v2.uploader.destroy(image_id, (err, result) => {
        if (err) res.json({success: false, err: err})
        res.send('ok')
    })
};


