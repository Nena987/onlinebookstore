import React, { useState } from "react";
import { deleteBook, usePagedAuthorSearchBookList } from "./accessHooks";
import BookList from "./BookList";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import { useAuth } from "./useAuth";

const AuthorSearchPage = () => {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [login] = useAuth();
  const [
    list,
    location,
    loading,
    error,
    pages,
    page,
    forward,
    back,
    goToPage,
    length,
    pageSize,
    setPageSize,
    reload,
  ] = usePagedAuthorSearchBookList(27, searchQuery);
  if (loading) {
    return <h3>Loading...</h3>;
  } else {
    return (
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            padding: "10px",
            alignItems: "baseline",
          }}
        >
          <TextField
            sx={{ flexGrow: 1, marginLeft: "60px" }}
            margin="normal"
            name="search"
            label="Enter author's name"
            value={query}
            onChange={(e) => {
              const val = e.target.value;
              setQuery(val);
            }}
            variant="outlined"
          />
          <Button
            sx={{ marginLeft: "20px", backgroundColor: "black" }}
            variant="contained"
            color="success"
            onClick={() => setSearchQuery(query)}
          >
            Search
          </Button>
        </Box>
        <BookList
          list={list}
          onDelete={(id) => {
            deleteBook(id, login);
            reload();
          }}
        />
        <TablePagination
          component="div"
          count={length}
          page={page - 1}
          onPageChange={(e, p) => goToPage(p)}
          rowsPerPage={pageSize}
          onRowsPerPageChange={(e) => {
            setPageSize(parseInt(e.target.value, 20));
          }}
          labelDisplayedRows={({ from, to, count, page }) =>
            `Showing page ${page + 1} (${from}-${to + 1} from ${count})`
          }
          labelRowsPerPage="Books per page: "
        />
      </div>
    );
  }
};

export default AuthorSearchPage;
