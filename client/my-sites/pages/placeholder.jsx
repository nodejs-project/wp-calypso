/** @format */

/**
 * External dependencies
 */
import React from 'react';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import CompactCard from 'components/card/compact';
import SiteIcon from 'blocks/site-icon';

class PagePlaceholder extends React.Component {
	static displayName = 'PagePlaceholder';

	render() {
		return (
			<CompactCard className="page is-placeholder">
				{ this.props.multisite ? <SiteIcon size={ 34 } /> : null }
				<a className="page__title">
					<span className="placeholder-text">
						{ this.props.translate( 'Loading a page of Pages…' ) }
					</span>
				</a>
				{ this.props.multisite ? (
					<span className="page__site-url ">
						<span className="placeholder-text">
							{ this.props.translate( 'A domain, quite soon…' ) }
						</span>
					</span>
				) : null }
			</CompactCard>
		);
	}
}

class MarkerPlaceholder extends React.Component {
	static displayName = 'MarkerPlaceholder';

	render() {
		return (
			<div className="pages__page-list-header is-placeholder">
				<span>&nbsp;</span>
			</div>
		);
	}
}

export const Page = localize( PagePlaceholder );
export const Marker = localize( MarkerPlaceholder );
