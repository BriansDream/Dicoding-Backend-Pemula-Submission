const Books = require('./books');
const { nanoid } = require('nanoid');

// Menyimpan buku yang di request oleh client
const addBookHandler = (request,h) => {
    // property request payload akan langsung mengubah json menjadi objek
      const {name,year,author,summary,publisher,pageCount,readPage,reading} = request.payload;

    if(!name) {
       const response =  h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }

    if(pageCount < readPage) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }
      
// Property yang diolah dan didapatkan disisi server
    const id = nanoid(16);
    const finished = pageCount === readPage;
    const instertedAt = new Date().toISOString();
    const updatedAt = instertedAt;

    const newBook = {
        id,name,year,author,summary,publisher,pageCount,readPage,finished,reading,instertedAt,updatedAt
};
    Books.push(newBook);

    // Cek apakah data sudah masuk menggunakan id
    const isSucces = Books.filter((book) => book.id === id).length > 0;
        
    // Jika idnya sama maka buku berhasil disimpan
    if(isSucces) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    } else {
    // General error
    const response = h.response({
        status: 'fail',
        message: "Buku gagal ditambahkan"
    });
    response.code(500);
    return response;
}
};


const getAllBookHandler = (request,h) => {
    const {name,reading,finished} = request.query;

    if(name !== undefined) {
            Books.filter((showBookName) => {
           showBookName.name.toLowerCase().includes(name.toLowerCase())})
    }

    const listBook = Books.map((dataBook) => ({
        id: dataBook.id,
        name: dataBook.name,
        publisher: dataBook.publisher,
}));

   
       const response = h.
        response({
            status: 'success',
            data: {
               books: listBook,
            },           
        })
        .code(200);
        return response;
      


}


module.exports = {getAllBookHandler,addBookHandler}


