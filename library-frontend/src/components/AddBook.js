import React, { useState, useEffect } from "react";
import BookService from "../Services/BookService";
import { useNavigate, Link, useParams } from "react-router-dom";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [pageNumber, setPageNumber] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const saveBook = (e) => {
    e.preventDefault();

    if(title === "" || author ==="" || releaseDate==="" || pageNumber==="" || image===""){
      setMessage("Vui lòng điền đủ các trường");
    }
    else {
      const book = { title, author, category, releaseDate, pageNumber, image};

      if (id) {
        BookService.updateBook(id, book)
          .then((response) => {
            navigate("/books");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        BookService.createBook(book)
          .then((response) => {
            navigate("/books");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  useEffect(() => {
    BookService.getBookById(id)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setCategory(response.data.category);
        setReleaseDate(response.data.releaseDate);
        setPageNumber(response.data.pageNumber);
        setImage(response.data.image);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleTitle = () => {
    if (id) {
      return <h2 className="text-center">Update Book</h2>;
    } else {
      return <h2 className="text-center">Add Book</h2>;
    }
  };

  const handleButton = () => {
    if (id) {
      return "Update Book";
    } else {
      return "Add Book";
    }
  };

  const handleImg = async (e) => {
    const file = e.target.files[0]
    file.preview = URL.createObjectURL(file)
    setImage(file.preview)
  }

  return (
    <div className="add_book">
      <div className="containet">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {handleTitle()}
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Tiêu đề</label>
                  <input
                    type="text"
                    placeholder="Nhập tiêu đề"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={(e) => {setTitle(e.target.value); setMessage("")}}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Tác giả</label>
                  <input
                    type="text"
                    placeholder="Nhập tác giả"
                    name="author"
                    className="form-control"
                    value={author}
                    onChange={(e) => {setAuthor(e.target.value); setMessage("")}}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Thể loại</label>
                  <select
                    name="category"
                    className="form-control"
                    value={category}
                    onChange={(e) => {setCategory(e.target.value); setMessage("")}}
                  >
                    <option value="Chính trị - pháp luật">Chính trị - pháp luật</option>
                    <option value="Khoa học công nghệ - Kinh tế">Khoa học công nghệ - Kinh tế</option>
                    <option value="Văn học nghệ thuật">Văn học nghệ thuật</option>
                    <option value="Văn hóa xã hội - Lịch sử">Văn hóa xã hội - Lịch sử</option>
                    <option value="Giáo trình">Giáo trình</option>
                    <option value="Truyện, tiểu thuyết">Truyện, tiểu thuyết</option>
                    <option value="Tâm lý, tâm linh, tôn giáo">Tâm lý, tâm linh, tôn giáo</option>
                    <option value="Sách thiếu nhi">Sách thiếu nhi</option>
                  </select>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Ngày xuất bản</label>
                  <input
                    type="text"
                    placeholder="Nhập ngày xuất bản"
                    name="releaseDate"
                    className="form-control"
                    value={releaseDate}
                    onChange={(e) => {setReleaseDate(e.target.value); setMessage("")}}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Số trang</label>
                  <input
                    type="number"
                    placeholder="Nhập số trang"
                    name="pageNumber"
                    className="form-control"
                    value={pageNumber}
                    onChange={(e) => {setPageNumber(e.target.value); setMessage("")}}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Ảnh bìa</label>
                  <input
                    type="file"
                    name="image"
                    className="form-control"
                    accept=".jpg, .jpeg, .png"
                    onChange={e => {handleImg(e); setMessage("")}}
                  ></input>
                  {image && (
                    <img src={image}/>
                  )}
                </div>
                <p>{message}</p>
                <div className="button_add">
                  <button
                    id="save"
                    className="btn btn-success"
                    onClick={(e) => saveBook(e)}
                  >
                    {handleButton()}
                  </button>
                  <Link to="/books" id="cancel" className="btn btn-danger">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
