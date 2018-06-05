const config = require('config');
const path = require('path');
const moment = require('moment');

const fs = require('fs');


const token        = require('../../lib/token');
const bluebird = require('bluebird')



const multer = require('multer');
const Q      = require('q');
const mkdirp = require('mkdirp');

const awsS3 = require('../../lib/aws/s3');

const uploadFiles = (req,res) =>{

	let results = []

	upload(req, res)
	.then( (files) =>
		{

			return bluebird.map(files, file=>{
				console.debug( '--s3 upload start 111 --' );

				file.token = token('photo').generate(30);

				console.debug( 'file.token=%s',file.token );

				file.photoId = `contents/photo/${file.token}${path.extname( file.originalname )}`

				console.debug( '--s3 upload start--' );


				return awsS3.put( file, (e,data)=> {

					if(e){
						console.info(`error => ${e}`)
					}

					file.photoId = data.key;
					file.etag = JSON.parse( data.ETag );
					file.location = data.Location;
					file.key = data.key;


				});
			})
			.then(_=> results)

		}, (err)=>{
			console.log(err);
			return res.json(error(213));
		}
	)
	.then(_=>{ return res.json(results)});
}


/**
 *  파일 업로드
 *
 * @param req
 * @param res
 * @returns {*|promise}
 */
const upload = function (req, res) {

	var deferred = Q.defer();

	var storage = multer.memoryStorage(
		/*{

		// 서버에 저장할 폴더
		destination: function (req, file, cb) {

			//let userId = req.decoded.userId;
			let curYmd = moment(new Date()).format('YYYYMMDD');
			let photoPath = path.join( '/appdata/contents/photos/', curYmd );

			// 회원번호 디렉토리 생성
			mkdirp( photoPath , function (err) {
				if (err) {
					console.error('--mkdirp--');
					console.error(err);
				}
				else{
					cb(null, photoPath );
				}
			});
		},

		// 서버에 저장할 파일 명
		filename: function (req, file, cb) {
			console.debug( 'filename: %j', file );
			cb(null, file.originalname );
		}
		}*/
	);

	var upload = multer({ storage: storage }).any();

	upload(req, res, function (err) {
		if (err) {
			console.debug(err)
			deferred.reject();
		}
		else{
			if( !req.files ){
				console.debug('2')
				deferred.reject();
			}
			else {
				deferred.resolve(req.files);
			}
		}
	});

	return deferred.promise;

}

module.exports = {
	uploadFiles,

}