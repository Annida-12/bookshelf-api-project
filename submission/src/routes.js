import { addBookHandler, getAllBooksHandler, getBookByIdHandler, updateBookHandler, deleteBookByIdHandler } from './handlers.js';

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
    },    
    {    
        method: 'GET',
        path: '/books/{id}',
        handler: getBookByIdHandler,
    },
    {
        method: 'UPDATE',
        path: '/books',
        handler: updateBookHandler
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookByIdHandler,
    },
];

export default routes;