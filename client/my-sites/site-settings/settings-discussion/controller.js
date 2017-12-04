/** @format */

/**
 * External dependencies
 */

import React from 'react';

/**
 * Internal dependencies
 */
import { renderWithReduxStore } from 'lib/react-helpers';
import DiscussionMain from 'my-sites/site-settings/settings-discussion/main';

export const discussion = function( context ) {
	renderWithReduxStore(
		React.createElement( DiscussionMain ),
		document.getElementById( 'primary' ),
		context.store
	);
};
