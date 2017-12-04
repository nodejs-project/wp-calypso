export const getMimeBaseTypeFromFilter = function( filter ) {
    var mime;

    switch ( filter ) {
        case 'images':
            mime = 'image/';
            break;
        case 'audio':
            mime = 'audio/';
            break;
        case 'videos':
            mime = 'video/';
            break;
        case 'documents':
            // All document formats allowed by WordPress are prefixed by
            // application/. Despite its name, no other type allowed by WP
            // is using the prefix so this is easier then listing all doc
            // types separately.
            mime = 'application/';
            break;
        default:
            mime = '';
            break;
    }

    return mime;
};
