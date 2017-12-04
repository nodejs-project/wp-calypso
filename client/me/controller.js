/** @format */

/**
 * External dependencies
 */

import ReactDom from 'react-dom';
import React from 'react';
import { includes } from 'lodash';
import page from 'page';
import i18n from 'i18n-calypso';

/**
 * Internal dependencies
 */
import analytics from 'lib/analytics';
import route from 'lib/route';
import userSettings from 'lib/user-settings';
import { setDocumentHeadTitle as setTitle } from 'state/document-head/actions';
import { setSection } from 'state/ui/actions';
import { renderWithReduxStore } from 'lib/react-helpers';

const ANALYTICS_PAGE_TITLE = 'Me';

export const sidebar = function( context, next ) {
	const SidebarComponent = require( 'me/sidebar' );

	renderWithReduxStore(
		React.createElement( SidebarComponent, {
			context: context,
		} ),
		document.getElementById( 'secondary' ),
		context.store
	);

	next();
};

export const profile = function( context ) {
	const ProfileComponent = require( 'me/profile' ),
		basePath = context.path;

	context.store.dispatch( setTitle( i18n.translate( 'My Profile', { textOnly: true } ) ) ); // FIXME: Auto-converted from the Flux setTitle action. Please use <DocumentHead> instead.

	analytics.pageView.record( basePath, ANALYTICS_PAGE_TITLE + ' > My Profile' );

	renderWithReduxStore(
		React.createElement( ProfileComponent, {
			userSettings: userSettings,
			path: context.path,
		} ),
		document.getElementById( 'primary' ),
		context.store
	);
};

export const apps = function( context ) {
	const AppsComponent = require( 'me/get-apps' ).default;
	const basePath = context.path;

	context.store.dispatch( setTitle( i18n.translate( 'Get Apps', { textOnly: true } ) ) ); // FIXME: Auto-converted from the Flux setTitle action. Please use <DocumentHead> instead.

	analytics.pageView.record( basePath, ANALYTICS_PAGE_TITLE + ' > Get Apps' );

	renderWithReduxStore(
		React.createElement( AppsComponent, {
			userSettings: userSettings,
			path: context.path,
		} ),
		document.getElementById( 'primary' ),
		context.store
	);
};

export const nextSteps = function( context ) {
	const analyticsBasePath = route.sectionify( context.path ),
		NextSteps = require( './next-steps' ),
		isWelcome = 'welcome' === context.params.welcome;

	context.store.dispatch( setTitle( i18n.translate( 'Next Steps', { textOnly: true } ) ) ); // FIXME: Auto-converted from the Flux setTitle action. Please use <DocumentHead> instead.

	if ( isWelcome ) {
		ReactDom.unmountComponentAtNode( document.getElementById( 'secondary' ) );
		context.store.dispatch( setSection( null, { hasSidebar: false } ) );
	}

	analytics.tracks.recordEvent( 'calypso_me_next_view', { is_welcome: isWelcome } );
	analytics.pageView.record( analyticsBasePath, ANALYTICS_PAGE_TITLE + ' > Next' );

	renderWithReduxStore(
		React.createElement( NextSteps, {
			path: context.path,
			isWelcome: isWelcome,
		} ),
		document.getElementById( 'primary' ),
		context.store
	);
};

export const nextStepsWelcomeRedirect = function( context, next ) {
	if ( includes( context.path, '?welcome' ) ) {
		return page.redirect( '/me/next/welcome' );
	}

	next();
};

export const profileRedirect = function() {
	page.redirect( '/me' );
};

export const trophiesRedirect = function() {
	page.redirect( '/me' );
};

export const findFriendsRedirect = function() {
	page.redirect( '/me' );
};
