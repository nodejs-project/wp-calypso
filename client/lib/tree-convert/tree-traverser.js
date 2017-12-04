/** @format */

/**
 * External dependencies
 */

import { findIndex, some } from 'lodash';

/**
 * Given a node within a tree, return the node's parent or the tree
 * itself if the node is not found within the tree.
 */
export function parent( node, tree ) {
	return (
		find( tree, function( it ) {
			return some( it.items, { id: node.id } );
		} ) || tree
	);
}

function traverse( node, filters, root ) {
	filters.forEach( function( filter ) {
		node = filter( node, root );
	}, this );

	if ( node.items ) {
		node.items = node.items.map( function( item ) {
			return traverse( item, filters, root );
		} );
	}

	return node;
}

/**
 * Depth-first search
 */
export function find( node, predicate ) {
	if ( predicate( node ) ) {
		return node;
	}

	if ( node.items ) {
		return mapFindAny( node.items, function( node ) {
			return find( node, predicate );
		} );
	}
}

/**
 * Depth-first search based replacement
 */
export function replaceItem( node, newNode, predicate ) {
	var i;

	if ( ! node.items ) {
		return;
	}

	for ( i = 0; i < node.items.length; i++ ) {
		if ( predicate( node.items[ i ] ) ) {
			node.items[ i ] = newNode;
			return;
		}
		replaceItem( node.items[ i ], newNode, predicate );
	}
}

/**
 * Returns the first non-null element resulting from the mapping of a function
 * over an array.
 */
function mapFindAny( array, fn ) {
	var i,
		result,
		length = array.length;
	for ( i = 0; i < length; i++ ) {
		if ( ( result = fn( array[ i ] ) ) ) {
			// eslint-disable-line no-cond-assign
			return result;
		}
	}
}

function childInserter( srcNode, dstId ) {
	return function( node ) {
		if ( node.id === dstId ) {
			node.items = node.items || [];
			node.items.push( srcNode );
		}
		return node;
	};
}

function siblingInserter( srcNode, dstId, position ) {
	return function( node ) {
		var index,
			offset = position === 'before' ? 0 : 1;

		if ( ~( index = findIndex( node.items, { id: dstId } ) ) ) {
			node.items.splice( index + offset, 0, srcNode );
		}
		return node;
	};
}

export const traverse = function( root, filters ) {
	return traverse( root, filters, root );
};

export const remover = function( id ) {
	return function( node ) {
		var index;
		if ( ~( index = findIndex( node.items, { id: id } ) ) ) {
			node.items.splice( index, 1 );
		}
		return node;
	};
};

export const inserter = function( srcItem, dstId, position ) {
	var func = 'child' === position ? childInserter : siblingInserter;
	return func( srcItem, dstId, position );
};
