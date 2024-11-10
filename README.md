# Book Finder App
This is a React-based application that allows users to search for books using the Open Library API. Users can search books by title and use advanced filters such as author name, publication year, ISBN, and book format to refine their search. The app includes options to reset filters and close the search modal for better user experience.

## Features
Search Books by Title: Enter the book title in the search box and find books related to your query.
### Advanced Filters:
Author: Filter books by author name.
Publication Year: Search for books based on the year they were first published.
ISBN: Look for books by their unique ISBN number.
Format: Filter books by format, such as ebook, paperback, etc.
Search Reset: Easily reset the filters to view all results from the initial title search.
Modal for Filters: Open and close a modal window to manage and apply advanced filters without cluttering the main UI.

## How to Use
### 1. Basic Book Search:
In the main search input, type a book title and click on the search button (🔍). The app will fetch book data from the Open Library API based on your query.
### 2. Advanced Search:
Click on the "Show Filters" button to open the modal with advanced filters.
Enter the desired filter criteria:
Author: Type the author's name.
Publication Year: Provide the year when the book was first published.
ISBN: Type the book's ISBN number.
Format: Specify the format (e.g., ebook, hardcover, etc.).
Click on the "Search" button to apply the filters and see the updated book results.
Click on the "Reset" button to remove all applied filters and return to the initial search results.
Use the "Close" button to close the modal window.
### 3. Responsive Design:
The app is responsive and can be used seamlessly on desktops, tablets, and mobile devices.

## Project Structure
src/: Contains all the app's source files.
App.js: The main component handling search logic, advanced filters, and API calls.
App.css: Contains the styling for the application, including responsiveness.
components/: Optional folder for breaking down UI into reusable components.
API Reference
This app uses the Open Library Search API to fetch book data. Example of a search URL:

https://openlibrary.org/search.json?title={searchTerm}
Where searchTerm is the title of the book you're searching for.

Technologies Used
React: A JavaScript library for building user interfaces.

Open Library API: An open source API for accessing book data.

React Icons: Used for the search icon (FaSearch).

CSS Flexbox and Grid: For responsive layout and styling.
