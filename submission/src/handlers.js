import { nanoid } from 'nanoid';
import { book } from './book.js';

// Handler untuk menambahkan buku
export const addBookHandler = (request, h) => {
    const { name, year, author,
      summary, publisher, pageCount,
      readPage, reading
    } = request.payload;
  
    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
  
    const newBook = {
      id, name, year, author,
      summary, publisher, pageCount,
      readPage, finished, reading,
      insertedAt, updatedAt,
    };
  
    if (!name) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    }
    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    }
    book.push(newBook);
    const isSuccess = book.filter((b) => b.id === id).length > 0;
    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      });
      response.code(201);
      return response;
    }
  };

// Handler untuk mendapatkan semua buku
export const getAllBooksHandler = (request, h) => {
    const { name, reading, finished } = request.query;
    let getBookFiltered = book;
  
    if (name) {
      getBookFiltered = getBookFiltered.filter((book) =>
        book.name.toLowerCase().includes(name.toLowerCase())
      );
    }
  
    if (reading === '0') {
      getBookFiltered = book.filter((book) => book.reading === false);
    }
    if (reading === '1') {
      getBookFiltered = book.filter((book) => book.reading === true);
    }
  
    if (finished === '0') {
      getBookFiltered = book.filter((book) => book.finished === false);
    }
    if (finished === '1') {
      getBookFiltered = bookf.filter((book) => book.finished === true);
    }
  
    const response = h.response({
      status: 'success',
      data: {
        books: getBookFiltered.map((book) => ({
          id: book.bookId,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  };

// Handler untuk mendapatkan buku berdasarkan ID
export const getBookByIdHandler = (request, h) => {
    const { id } = request.params;
    const book = book.find((book) => book.id === id);
  
    if (book !== undefined) {
      const response = h.response({
        status: 'success',
        data: {
          book,
        },
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  };

// Handler untuk memperbarui buku
export const updateBookHandler = (request, h) => {
    const { bookId } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const bookIndex = book.findIndex(b => b.id === bookId);

     if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  if (bookIndex === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  const updatedAt = new Date().toISOString();
  const finished = pageCount === readPage;

  book[bookIndex] = {
    ...book[bookIndex],
    name, year, author,
    summary, publisher, pageCount,
    readPage, finished, reading,
    updatedAt,
  };
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
  response.code(200);
  return response;
};

// Handler untuk menghapus buku
export const deleteBookByIdHandler = (request, h) => {
    const { id } = request.params;
    const bookIndex = book.findIndex((book) => book.id === id);
  
    if (bookIndex !== -1) {
      book.splice(bookIndex, 1);
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  };