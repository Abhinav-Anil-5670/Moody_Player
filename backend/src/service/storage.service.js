var Imagekit = require("imagekit")

var imagekit = new Imagekit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL
})

function uploadFile(file){
    return new Promise((resolve, reject)=>{
        imagekit.upload({
            file :  file.buffer,
            fileName : "Song"
        },(error,result)=>{
            if(error){
                reject(error)
            }
            else{
                resolve(result)
            }
        })
    })
}

module.exports = uploadFile