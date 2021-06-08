const {getAllBookHandler,addBookHandler} = require('./handler')
const routes = [ 
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books/{name?}',
        handler: getAllBookHandler,
    },

];

module.exports = routes;