/** @format */
let _loadedViaHistory = false;

export const start = function() {
	// add a popstate listener that sets the flag
	window.addEventListener( 'popstate', function( event ) {
		_loadedViaHistory = !! event.state;
	} );
};

export const loadedViaHistory = function() {
	return _loadedViaHistory;
};
