    import React, {useState, useEffect} from "react";

    function BookList() {
        const [books, setBooks] = useState([]);

        useEffect(() => {
            fetch('http://localhost:3000/books')
                .then(res => res.json())
                .then(data => setBooks(data));
        }, []);

        console.log(books);

        return (
            <>
                <h1> List of Books </h1>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Author</th>
                        <th scope="col">Publication Date</th>
                        <th scope="col">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.map((book, index) => (
                                <tr key={book._id}>
                                    <td scope="col">{index}</td>
                                    <td scope="col">{book.name}</td>
                                    <td scope="col">{book.author}</td>
                                    <td scope="col">{book.publicationDate}</td>
                                    <td scope="col">{book.type}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </>
        )
    }

    export default BookList;