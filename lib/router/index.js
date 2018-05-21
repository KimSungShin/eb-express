/**
 * Created by CYK on 2016-12-07.
 */

const routeconf = require('../../config/route.json');

const init = ( app )=>{

    //console.log('--- route setting ---');

    routeconf.routes.forEach( (route)=>{
        if( route.use ) {
            app.use( route.path, require(route.fn.path) );

            //console.log( 'route:[%s] path:[%s] init Success.' , route.name, route.path );
        }
    });

}

module.exports = init;