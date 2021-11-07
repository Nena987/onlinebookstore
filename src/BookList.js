import React from "react";
import { Rating } from "@mui/material";
import TableDropdown from "./TableDropdown";
import "./BookList.css";

const BookList = ({ list, onDelete }) => {
  return (
    <div className="books">
      {list.map((book) => (
        <div className="book">
          <div className="bookDiv">
            <h3 class="bookName">{book.title}</h3>
          </div>
          <div className="authorDiv">
            <p className="author">{book.authors.join(", ")}</p>
          </div>
          <p className="year">{book.publishDate}</p>
          <div className="sub">
            <span>
              <Rating
                name="half-rating-read"
                value={book.rating}
                precision={0.5}
                readOnly
                sx={{ color: "black" }}
              />
            </span>
            <span className="dots">
              <TableDropdown
                text="..."
                size="small"
                items={[
                  {
                    text: "View Book Details...",
                    link: true,
                    path: `/book/${book.id}/view`,
                  },
                  {
                    text: "Edit Book Details...",
                    link: true,
                    path: `/book/${book.id}/edit`,
                  },
                  {
                    text: "Delete Book",
                    link: false,
                    action: () => onDelete(book.id),
                  },
                ]}
              />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
