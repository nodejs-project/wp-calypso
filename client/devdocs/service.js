/** @format */

/**
 * External dependencies
 */

import request from 'superagent';

function fetchDocsEndpoint( endpoint, params, callback ) {
	request
		.get( '/devdocs/service/' + endpoint )
		.query( params )
		.end( function( error, res ) {
			if ( res.ok ) {
				callback( null, res.body || res.text ); // this conditional is to capture both JSON and text/html responses
			} else {
				callback( 'Error invoking /devdocs/' + endpoint + ': ' + res.text, null );
			}
		} );
}

export const search = function( term, callback ) {
	fetchDocsEndpoint( 'search', { q: term }, callback );
};

export const list = function( filenames, callback ) {
	fetchDocsEndpoint( 'list', { files: filenames.join( ',' ) }, callback );
};

export const fetch = function( path, callback ) {
	fetchDocsEndpoint( 'content', { path: path }, callback );
};
