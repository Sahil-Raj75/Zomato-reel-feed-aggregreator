// import ImageKit from '@imagekit/nodejs';
const ImageKit = require('imagekit'); 
// const { toFile } = require('@imagekit/nodejs');

const client = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadFile = async (fileBuffer, filename) => {
    // const uploadFile = await toFile(fileBuffer, filename);
    const response = await client.upload({
        file: fileBuffer,
        fileName: filename,
    });

    return response;
};

module.exports = {
    uploadFile,
};