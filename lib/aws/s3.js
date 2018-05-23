/**
 * Created by CYK on 2017-01-11.
 */


let AWS = require('aws-sdk');
let fs = require('fs');
let path = require('path');
let config = require('config');

AWS.config.region = config.get('aws.region'); //ap-northeast-2';

const put = ( file, cb )=>{

    let s3 = new AWS.S3();

    let sourceFile = file.path;
    let fExt = path.extname( file.originalname );
    let targetFile =  file.photoId  ;

    console.log( 'targetFile=>%s',targetFile );
    console.log( 'file=>%j',file );

    let param = {
        Bucket:  config.get('aws.s3.Bucket') , // 'dev.photo.ifriendspet.com',
        ACL: config.get('aws.s3.ACL') ,    //'public-read',
        Key: targetFile,
        Body: fs.createReadStream(sourceFile),
        ContentType: file.mimetype , // 'image/png'
    }

    console.log( 'param=>%j',param );

    s3.upload(param, function(err, data){
        if( err ) {
            console.log(err);
            cb(err,null);
        }
        console.log(data);
        cb(null,data);
    })

}

const putPhotos = ( file )=>{

    let s3 = new AWS.S3();

    let sourceFile = file.path;
    let fExt = path.extname( file.originalname );
    let targetFile =  file.photoId  ;

    console.log( 'targetFile=>%s',targetFile );
    console.log( 'file=>%j',file );

    let param = {
        Bucket:  config.get('aws.s3.Bucket') , // 'dev.photo.ifriendspet.com',
        ACL: config.get('aws.s3.ACL') ,    //'public-read',
        Key: targetFile,
        Body: fs.createReadStream(sourceFile),
        ContentType: file.mimetype , // 'image/png'
    }

    console.log( 'param=>%j',param );

    return s3.upload(param).promise()

}

module.exports = {
    put,
    putPhotos
};