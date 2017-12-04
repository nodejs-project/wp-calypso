/** @format */

/**
 * External dependencies
 */

import LRU from 'lru';

/**
 * Internal Dependencies
 */

let cache = new LRU( 10 );
let specialCache = {};

function isSpecialStream( id ) {
	return /^following|a8c|likes|conversations/.test( id );
}

export const get = function( id ) {
	if ( isSpecialStream( id ) ) {
		return specialCache[ id ];
	}
	return cache.get( id );
};

export const set = function( id, store ) {
	if ( isSpecialStream( id ) ) {
		specialCache[ id ] = store;
	} else {
		cache.set( id, store );
	}
};

export const clear = function() {
	specialCache = {};
	cache = new LRU( 10 );
};
