import React from "react";
import { deleteBook, usePagedSearchBookList } from "./accessHooks";
import BookList from "./BookList";
import TablePagination from "@mui/material/TablePagination";
import { useAuth } from "./useAuth";

const CategorySearchPage = ({ category }) => {
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
  ] = usePagedSearchBookList(27, category);
  if (loading) {
    return <h3>Loading...</h3>;
  } else {
    return (
      <div>
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

export default CategorySearchPage;
