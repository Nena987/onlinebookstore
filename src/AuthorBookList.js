import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { Rating } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import "./BookList.css";

const AuthorBookList = ({ list }) => {
  const history = useHistory();
  return (
    <div className="authorBooks">
      <h3>More books from the same author</h3>
      <TableContainer component={Paper} sx={{ borderRadius: "15px" }}>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: "white",
                  backgroundColor: "black",
                  fontSize: "16px",
                }}
              >
                Book Title
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  backgroundColor: "black",
                  fontSize: "16px",
                }}
              >
                Authors
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  backgroundColor: "black",
                  fontSize: "16px",
                }}
              >
                Rating
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  backgroundColor: "black",
                  fontSize: "16px",
                }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((book) => (
              <TableRow
                key={book.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  sx={{
                    backgroundColor: "ivory",
                    color: "black",
                    fontSize: "14px",
                  }}
                >
                  {book.title}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "rgb(243, 229, 213)",
                    color: "black",
                    fontSize: "14px",
                  }}
                >
                  {book.authors.join(", ")}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "ivory",
                    color: "black",
                    fontSize: "14px",
                  }}
                >
                  <Rating
                    name="half-rating-read"
                    value={book.rating}
                    precision={0.5}
                    readOnly
                    sx={{ color: "black" }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "rgb(243, 229, 213)",
                    color: "black",
                    fontSize: "14px",
                  }}
                >
                  <Button
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      fontSize: "14px",
                    }}
                    variant="contained"
                    onClick={() => {
                      history.push(`/book/${book.id}/view`);
                    }}
                    color="success"
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AuthorBookList;
