export const STATUS_CODES = {
    '100': { statusText: 'Continue', descriptiveText: '' },
    '101': { statusText: 'switching protocols', descriptiveText: '' },
    '200': { statusText: 'OK', descriptiveText: 'Everything is fine!' },
    '201': {
        statusText: 'Created',
        descriptiveText: 'The request has succeeded!'
    },
    '202': { statusText: 'Accepted', descriptiveText: '' },
    '203': {
        statusText: 'Non-Authoritative Information',
        descriptiveText: ''
    },
    '204': { statusText: 'No Content', descriptiveText: '' },
    '205': { statusText: 'Reset Content', descriptiveText: '' },
    '206': { statusText: 'Partial Content', descriptiveText: '' },
    '300': { statusText: 'Multiple Choices', descriptiveText: '' },
    '301': { statusText: 'Moved Permanently', descriptiveText: '' },
    '302': { statusText: 'Found', descriptiveText: '' },
    '303': { statusText: 'See Other', descriptiveText: '' },
    '304': { statusText: 'Not Modified', descriptiveText: '' },
    '307': { statusText: 'Temporary Redirect', descriptiveText: '' },
    '308': { statusText: 'Permanent Redirect', descriptiveText: '' },
    '400': {
        statusText: 'Bad Request',
        descriptiveText: 'Invalid syntax!'
    },
    '401': {
        statusText: 'Unauthorized',
        descriptiveText: 'The client must authenticate itself!'
    },
    '403': { statusText: 'Forbidden', descriptiveText: '' },
    '404': {
        statusText: 'Not Found',
        descriptiveText: 'Resource is not available!'
    },
    '405': {
        statusText: 'Method Not Allowed',
        descriptiveText: 'The request method cannot be used'
    },
    '406': { statusText: 'Not Acceptable', descriptiveText: '' },
    '407': {
        statusText: 'Proxy Authentication Required',
        descriptiveText: ''
    },
    '408': { statusText: 'Request Timeout', descriptiveText: '' },
    '409': { statusText: 'Conflict', descriptiveText: '' },
    '410': {
        statusText: 'Gone',
        descriptiveText: 'Content permanently deleted'
    },
    '411': { statusText: 'Length Required', descriptiveText: '' },
    '412': { statusText: 'Precondition Failed', descriptiveText: '' },
    '413': { statusText: 'Payload Too Large', descriptiveText: '' },
    '414': { statusText: 'URI Too Long', descriptiveText: '' },
    '415': { statusText: 'Unsupported Media Type', descriptiveText: '' },
    '416': { statusText: 'Range Not Satisfiable', descriptiveText: '' },
    '417': { statusText: 'Expectation Failed', descriptiveText: '' },
    '418': { statusText: 'I"m a teapot', descriptiveText: '' },
    '422': { statusText: 'Unprocessable Entity', descriptiveText: '' },
    '425': { statusText: 'Too Early', descriptiveText: '' },
    '426': { statusText: 'Upgrade Required', descriptiveText: '' },
    '428': { statusText: 'Precondition Required', descriptiveText: '' },
    '429': { statusText: 'Too Many Requests', descriptiveText: '' },
    '431': {
        statusText: 'Request Header Fields Too Large',
        descriptiveText: ''
    },
    '451': {
        statusText: 'Unavailable For Legal Reasons',
        descriptiveText: ''
    },
    '500': {
        statusText: 'Internal Server Error',
        descriptiveText: 'Server could not manage your request!'
    },
    '501': {
        statusText: 'Not Implemented',
        descriptiveText: 'The method is not supported!'
    },
    '502': { statusText: 'Bad Gateway', descriptiveText: '' },
    '503': {
        statusText: 'Service Unavailable',
        descriptiveText: 'The server is not ready!'
    }, // Service Unavailable
    '504': { statusText: 'Gateway Timeout', descriptiveText: '' },
    '505': {
        statusText: 'HTTP Version Not Supported',
        descriptiveText: ''
    },
    '511': {
        statusText: 'Network Authentication Required',
        descriptiveText: ''
    }
};
