/**
 * Created by Sung Shin on 2017-09-19.
 */

const apn = require('apn')
const gcm = require('node-gcm')
const config = require('config');
const pushTokenBiz = require('../../api/pushToken/pushToken.biz')
const Reaction = require('../../database/model/reaction')
const Snap = require('../../database/model/snap')
const Diary = require('../../database/model/diary')
const Comment = require('../../database/model/comment')
const Alarm = require('../../database/model/alarm')
const logger = require('../../lib/logger');
const sequelize = require('../../database');
const Sequelize = require('sequelize');
const code      = require('../../config/commonCode.json');



const apnSender = ( apnToken, data, tx) =>{

	let options = config.get('push.ios.dev')

	let apnProvider = new apn.Provider(options);

	let note = new apn.Notification()
	note.alert = data.message
	note.payload = {
		'type' : data.type,
		'contentId' : data.contentId,
		'pushChkType' : data.pushChkType
	}
	note.badge = data.badgeCount
	note.sound = 'default'

	apnProvider.send(note, apnToken)
	.then(results => {
		logger.info(`apn push result=> ${JSON.stringify(results,null,2)}`)
	});

	apnProvider.shutdown();

}


const gcmSender = ( gcmToken, data, tx ) =>{

	let options = config.get('push.android.api_key')

	logger.info(`gcmsender data => ${JSON.stringify(data,null,2)}`)
	// or with object values
	var message = new gcm.Message({
		collapseKey: 'demo',
		delayWhileIdle: false,
		timeToLive: 0,

	});

	message.addData("title","아이프렌즈펫")
	message.addData("body",data.message)
	message.addData("type",data.type)

	if(data.contentId){
		message.addData("contentId",data.contentId)
	}

	if(data.badgeCount){
		message.addData("badgeCount",data.badgeCount)
	}

	if(data.pushChkType){
		message.addData("pushChkType",data.pushChkType)
	}

	var sender = new gcm.Sender(options);

	// 푸시를 날린다!
	sender.send(message, gcmToken , 4, (err, res )=> {
		// 여기서 푸시 성공 및 실패한 결과를 준다. 재귀로 다시 푸시를 날려볼 수도 있다.
		if(err){
			return logger.error(JSON.stringify(err,null,2))
		}
		else {
			logger.debug(JSON.stringify(res,null,2))
			if(res.results){
				res.results.forEach( result => {
					if(result.registration_id){
						sender.send(message,result.registration_id,4,(error,response)=> {
							if(error){
								return logger.err(error)
							}
							else {
								return logger.debug(JSON.stringify(response,null,2))
							}
						})
					}
				})
			}
		}
	});

}

const send = ( userId, reactionId, type, message ,alarmId ,tx ) =>{
	logger.info(`push send params userId = ${userId} , reactionId = ${reactionId}`)
	logger.info(`push message = ${message}`);

	let data = {}, apnToken = [] , gcmToken = [], reactionResult

	data['message'] = message
	data['alarmId'] = alarmId

	return Reaction.findOne({where:{reactionId}, transaction:tx })
	.then(reaction => {
		reactionResult = reaction.dataValues

		if( type == code.Push.type.community || type == code.Push.type.tag ){

			data['pushChkType'] = type == code.Push.type.community ? code.Push.type.community : code.Push.type.tag

			//data['pushChkType'] = 'community'
			return pushTokenBiz.list( userId, tx)
			.then(tokens => {
				if (tokens) {
					return Sequelize.Promise.map(tokens, tk => {
						data['badgeCount'] = tk.badgeCount + 1
						if(tk.pushSetting && tk.pushSetting.openYn == true){
							(tk.os == code.Push.os.ios ) ? apnToken.push(tk.token) : gcmToken.push(tk.token)
						}
						return pushTokenBiz.update( tk.userId,{badgeCount: tk.badgeCount + 1})
					})
				}
			})

		}
		else {
			if(type == code.Push.type.comment ){
				data['pushChkType'] = code.Push.pushChkType.comment
			}
			else if(type == code.Push.type.emotion ){
				data['pushChkType'] = ( reactionResult.type == code.Reaction.type.comment ) ? code.Push.pushChkType.commentEmotion : code.Push.pushChkType.emotion
			}

			if (userId != reaction.userId) {
				return pushTokenBiz.list(reaction.userId, tx)
				.then(tokens => {
					if (tokens) {
						return Sequelize.Promise.map(tokens, tk => {

							data['badgeCount'] = tk.badgeCount + 1

							if(tk.pushSetting && tk.pushSetting.openYn == true){
								(tk.os == code.Push.os.ios ) ? apnToken.push(tk.token) : gcmToken.push(tk.token)
							}
							return pushTokenBiz.update(tk.userId,{badgeCount: tk.badgeCount + 1})
						})
					}
				})
			}
		}

	})
	.then(_=>{
		if(reactionResult.type == code.Reaction.type.snap ){
			data['type'] = code.Reaction.type.snap
			return Snap.findOne({where:{reactionId},transaction:tx}).then(snap=>{
				data['contentId'] = snap.snapId
				logger.info(`push data info => ${JSON.stringify(data,null,2)}`)
			})
		}
		else if(reactionResult.type == code.Reaction.type.diary ){
			data['type'] = code.Reaction.type.diary
			return Diary.findOne({where:{reactionId},transaction:tx}).then(diary=>{
				data['contentId'] = diary.diaryId
				logger.info(`push data info => ${JSON.stringify(data,null,2)}`)
			})
		}
		else {
			return Comment.findOne({where:{evalReactionId:reactionId},transaction:tx}).then(comment=>{
				data['type'] = comment.type

				if(comment.type == code.Reaction.type.snap ){
					return Snap.findOne({where:{reactionId:comment.reactionId},transaction:tx}).then(snap=>{
						data['contentId'] = snap.snapId
						logger.info(`push data info => ${JSON.stringify(data,null,2)}`)
					})
				}

				else if(comment.type == code.Reaction.type.snap ){
					return Diary.findOne({where:{reactionId:comment.reactionId},transaction:tx}).then(diary=>{
						data['contentId'] = diary.diaryId
						logger.info(`push data info => ${JSON.stringify(data,null,2)}`)
					})
				}
			})
		}

	})
	.then(_=> {

		if(apnToken.length > 0){
			apnSender(apnToken,data, tx)
		}

		if(gcmToken.length > 0){
			gcmSender(gcmToken,data, tx)
		}
	})
}



module.exports = {
	send,
	apnSender,
	gcmSender
}