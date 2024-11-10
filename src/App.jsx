import React, { useState } from 'react';
import './App.css';
import { FaSearch } from 'react-icons/fa';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchBook, setSearchBook] = useState('');
  const [bookData, setBookData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showFilters, setShowFilters] = useState(false); 
  const [filters, setFilters] = useState({
    author: '',
    year: '',
    isbn: '',
    format: '',
    country: '',
  });

  const searchHandler = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${searchBook}`
      );
      const data = await response.json();
      setBookData(data.docs);
      setFilteredData(data.docs);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching the books:', error);
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filteredBooks = [...bookData];

    if (filters.author) {
      filteredBooks = filteredBooks.filter((book) =>
        book.author_name?.some((author) =>
          author.toLowerCase().includes(filters.author.toLowerCase())
        )
      );
    }

    if (filters.year) {
      filteredBooks = filteredBooks.filter(
        (book) => book.first_publish_year === parseInt(filters.year)
      );
    }

    if (filters.isbn) {
      filteredBooks = filteredBooks.filter((book) =>
        book.isbn?.some((isbn) => isbn.includes(filters.isbn))
      );
    }

    if (filters.format) {
      filteredBooks = filteredBooks.filter((book) =>
        book.format?.toLowerCase().includes(filters.format.toLowerCase())
      );
    }

    setFilteredData(filteredBooks);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setFilters({
      author: '',
      year: '',
      isbn: '',
      format: '',
      country: '',
    });
    setFilteredData(bookData);
    setShowFilters(false); 
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="App">
      <h1 className="appTitle">Hello! I am Alexa.</h1>
      <h2>Your Book Finder, which book are you searching for?</h2>

      <div className="search">
        <input
          type="text"
          placeholder="Enter book title..."
          value={searchBook}
          onChange={(e) => setSearchBook(e.target.value)}
          className="searchBox"
        />
        <button onClick={searchHandler} className="searchButton">
          <FaSearch size={20} />
        </button>
      </div>

      <div className="filterToggle">
        <button
          onClick={() => setShowFilters(true)}
          className="filterButton"
        >
          Advance Filters
        </button>
      </div>

      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="books">
          {filteredData.length > 0 ? (
            <ul className="bookList">
              {filteredData.map((book) => (
                <li key={book.key} className="bookItem">
                  {book.cover_i ? (
                    <img
                      src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                      alt={`${book.title} cover`}
                      className="bookCover"
                    />
                  ) : (
                    <div className="noCover">No cover available</div>
                  )}
                  <div className="bookDetails">
                    <h3>{book.title}</h3>
                    <p>Author: {book.author_name?.join(', ') || 'Unknown'}</p>
                    <p>First Published: {book.first_publish_year || 'Unknown'}</p>
                    <p>ISBN: {book.isbn?.[0] || 'N/A'}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="noResult">No books found.</p>
          )}
        </div>
      )}

      {showFilters && (
        <div className="modal">
          <div className="modalContent">
            <h3>Apply Filters</h3>
            <div className="filterOptions">
              <input
                type="text"
                placeholder="Author"
                name="author"
                value={filters.author}
                onChange={handleFilterChange}
                className="filterInput"
              />
              <input
                type="text"
                placeholder="Publication Year"
                name="year"
                value={filters.year}
                onChange={handleFilterChange}
                className="filterInput"
              />
              <input
                type="text"
                placeholder="ISBN"
                name="isbn"
                value={filters.isbn}
                onChange={handleFilterChange}
                className="filterInput"
              />
              <input
                type="text"
                placeholder="Format (e.g., ebook)"
                name="format"
                value={filters.format}
                onChange={handleFilterChange}
                className="filterInput"
              />
            </div>
            <div className="filterActions">
              <button onClick={applyFilters} className="filterSearchButton">
                Search
              </button>
              <button onClick={resetFilters} className="filterResetButton">
                Reset
              </button>
              <button onClick={() => setShowFilters(false)} className="closeButton">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
