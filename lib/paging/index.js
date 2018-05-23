

const config = require('config');

const logger = require('../../lib/logger');


const host = config.get('host');

const querystring = require('querystring');


const get  = ( req ) => {

    let paging = { type: 'offset' };

    //logger.debug('lib/paging req.query=>[%s]',req.query);

    if( req.params.offset || req.query.offset  || req.body.offset){
        paging['offset'] =  parseInt(req.params.offset || req.query.offset  || req.body.offset);
        paging['type'] = 'offset';
    }

    if( req.params.limit || req.query.limit || req.body.limit){
        paging['limit'] =  parseInt(req.params.limit || req.query.limit  || req.body.limit);
    }

    if( req.params.after || req.query.after || req.body.after){
        paging['after'] = req.params.after || req.query.after || req.body.after;
        paging['type'] = 'cursors';
    }

    if( req.params.before || req.query.before || req.body.before){
        paging['before'] = req.params.before || req.query.before || req.body.before;
        paging['type'] = 'cursors';
    }

    if( req.params.since  || req.query.since || req.body.since){
        paging['since'] =  req.params.since  || req.query.since || req.body.since;
        paging['type'] = 'time';
    }

    if( req.params.until|| req.query.until || req.body.until){
        paging['until'] = req.params.until|| req.query.until || req.body.until;
        paging['type'] = 'time';
    }

    if( req.originalUrl ){
        paging.originalUrl = req.originalUrl;
    }

    if( req.baseUrl ){
        paging.baseUrl = req.baseUrl;
    }

    if( req.path ){
        paging.path = req.path;
    }

    if( req.query ){
        paging.query = req.query;
    }
    else{
        paging.query = {}
    }
    console.log( `paging:::${JSON.stringify(paging,null,2)}` )

    return paging;
}

const json = ( results, paging ) =>{

    let pageInfo = {};

    if( paging.type === 'cursors' ){
        pageInfo = {
            cursors: { after:paging.after, before: paging.before },
            previous: paging.baseUrl+'?limit='+paging.limt+'&before='+paging.before,
            after: paging.baseUrl+'?limit='+paging.limt+'&after='+paging.after,
        }
    }
    else
    if( paging.type === 'time' ){
        pageInfo = {
            previous: paging.baseUrl+'?limit='+paging.limt+'&since='+paging.since,
            after: paging.baseUrl+'?limit='+paging.limt+'&until='+paging.until,
        }
    }
    else
    if( paging.type === 'offset' ) {
        // 이전페이지
        if( paging.offset >= paging.limit ){
            paging.query.limit = paging.limit;
            paging.query.offset = parseInt(paging.offset-paging.limit);
            pageInfo['prvious'] =  host + paging.baseUrl + paging.path  +'?' + querystring.stringify(paging.query);
            //pageInfo['prvious'] =  host + paging.baseUrl + paging.path  +'?limit='+paging.limit+'&offset='+parseInt(paging.offset-paging.limit);
        }
        // 다음페이지
        if( results.length >  paging.limit ){

            paging.query.limit = paging.limit;
            paging.query.offset = parseInt(paging.offset+paging.limit);
            pageInfo['next'] =  host+paging.baseUrl + paging.path+'?' + querystring.stringify(paging.query);
            //pageInfo['next'] =  host+paging.baseUrl + paging.path+'?limit='+paging.limit+'&offset='+parseInt(paging.offset+paging.limit);
            results.pop();
        }

        console.log( `pageInfo:::${JSON.stringify(pageInfo,null,2)}` )

    }

    return { data:results, paging: pageInfo };
}

module.exports.init = get;
module.exports.json = json;
