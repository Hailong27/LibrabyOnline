import React, {useState, useEffect} from 'react'
import BookService from '../Services/BookService.js'
import {Link} from 'react-router-dom'

const ListBooks = () => {

    const [books, setBooks] = useState([])

    useEffect(() => {
        getAllBooks();
    }, []);

    const getAllBooks = () => {
        BookService.getAllBooks().then((response)=> {
            setBooks(response.data)
        }).catch(error=> {
            console.log(error)
        })
    }

    const deleteBook = (bookId) => {
        BookService.deleteBook(bookId).then((response)=> {
            getAllBooks();
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className='container'>
            <h2 className='text-center'>List Books</h2>
            {
                localStorage.getItem("user-info") ?
                <>
                    <Link to='/add' className='btn btn-primary mb-2'>Add Book</Link>
                </>
                :
                <>
                </>
            }
            
            <table id="table" className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Ảnh bìa</th>
                        <th>Tiêu đề</th>    
                        <th>Tác giả</th>
                        <th>Thể loại</th>
                        <th>Ngày phát hành</th>
                        <th>Số trang</th>
                        <th>Hoạt động</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map(book => 
                            <tr key={book.id}>
                                <td><img id="image_list"src={book.image}/></td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.category}</td>
                                <td>{book.releaseDate}</td>
                                <td>{book.pageNumber}</td>
                                {
                                    localStorage.getItem("user-info") ?
                                    <td>
                                        <Link to={`/book-details/${book.id}`} className='btn btn-info'>Xem</Link>
                                        <button id="delete" className='btn btn-danger' onClick={() => {deleteBook(book.id)}}>Xóa</button>
                                    </td>
                                    :
                                    <td>
                                    </td>
                                }
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListBooks