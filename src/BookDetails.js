import React, { useState } from "react";
import { Formik } from "formik";
import "./BookDetails.css";
import { toStandardTime } from "./validationTools";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import DatePicker from "@mui/lab/DatePicker";
import { useHistory, useLocation } from "react-router-dom";
import AuthorBookList from "./AuthorBookList";
import { usePagedAuthorSearchBookList } from "./accessHooks";

const BookDetails = ({ startingMode, book, action }) => {
  const [list] = usePagedAuthorSearchBookList(10, book.authors[0]);
  const [mode, setMode] = useState(startingMode);
  const history = useHistory();
  let message = "";
  let inputProps = {};
  let hideID = false;
  if (mode === "view") {
    message = `${book.title} by ${book.authors.join(", ")}`;
    inputProps = { readOnly: true };
  } else if (mode === "edit") {
    message = `Change book details:  ${book.title} by ${book.authors.join(
      ", "
    )}`;
  } else if (mode === "create") {
    message = "Add new book";
    hideID = true;
  }
  return (
    <div className="bookDetails">
      <div className="formContent">
        <h3>{message}</h3>
        <Formik
          initialValues={book}
          validate={(values) => {
            const errors = {};
            if (!values.title) errors.title = "Title cannot be blank.";
            if (!values.authors[0])
              errors.authors = "Book must have at least one author.";
            if (!values.genre) errors.genre = "You need to select a genre.";
            if (!values.publishDate) errors.publishDate = "Select a date.";
            if (!values.rating) errors.rating = "Rating cannot be blank.";
            if (isNaN(values.rating) || values.rating > 5 || values.rating < 1)
              errors.rating = "Rating must be a number between 1 and 5";
            if (!values.isbn) errors.isbn = "ISBN cannont be blank";
            if (isNaN(values.isbn) || values.isbn.length !== 13)
              errors.isbn = "ISBN must be a number of 13 digits.";
            if (!values.pages) errors.pages = "Enter the number of pages.";
            if (isNaN(values.pages))
              errors.pages = "You must enter number of pages.";
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const rez = action(values);
            setSubmitting(false);
            history.go(-1);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            setFieldTouched,
            validateField,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              {hideID || (
                <TextField
                  fullWidth
                  margin="normal"
                  name="id"
                  label="Id"
                  value={values.id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.id && Boolean(errors.id)}
                  helperText={touched.id && errors.id}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                />
              )}
              <TextField
                fullWidth
                margin="normal"
                name="title"
                label="Book title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                variant="outlined"
                InputProps={inputProps}
              />
              <TextField
                fullWidth
                margin="normal"
                name="authors"
                label="Authors"
                value={values.authors}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.authors && Boolean(errors.authors)}
                helperText={touched.authors && errors.authors}
                variant="outlined"
                InputProps={inputProps}
              />

              <TextField
                fullWidth
                margin="normal"
                name="genre"
                label="Genre"
                value={values.genre}
                onChange={handleChange}
                select
                onBlur={handleBlur}
                error={touched.genre && Boolean(errors.genre)}
                helperText={touched.genre && errors.genre}
                variant="outlined"
                InputProps={inputProps}
              >
                <MenuItem value={"Science Fiction"}>Science Fiction</MenuItem>
                <MenuItem value={"Fantasy"}>Fantasy</MenuItem>
                <MenuItem value={"Mystery"}>Mystery</MenuItem>
                <MenuItem value={"Computing"}>Computing</MenuItem>
                <MenuItem value={"Horror"}>Horror</MenuItem>
              </TextField>
              <br />

              <DatePicker
                margin="normal"
                name="publishDate"
                label="PublishDate:"
                value={values.publishDate}
                readOnly={inputProps.readOnly ? true : false}
                onChange={(e) => {
                  setFieldValue("publishDate", toStandardTime(e));
                  setFieldTouched("publishDate", true, true);
                  validateField("publishDate");
                }}
                onBlur={handleBlur}
                renderInput={(params) => <TextField {...params} />}
              />
              <span>
                {touched.publishDate && Boolean(errors.publishDate)
                  ? errors.publishDate
                  : ""}
              </span>
              <br />
              <TextField
                fullWidth
                margin="normal"
                name="rating"
                label="Rating: "
                value={values.rating}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.rating && Boolean(errors.rating)}
                helperText={touched.rating && errors.rating}
                // multiline
                // maxRows={4}
                variant="outlined"
              />

              <TextField
                fullWidth
                margin="normal"
                name="isbn"
                label="ISBN"
                value={values.isbn}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.isbn && Boolean(errors.isbn)}
                helperText={touched.isbn && errors.isbn}
                variant="outlined"
                InputProps={inputProps}
              />

              <TextField
                fullWidth
                margin="normal"
                name="pages"
                label="Pages"
                value={values.pages}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.pages && Boolean(errors.pages)}
                helperText={touched.pages && errors.pages}
                variant="outlined"
                InputProps={inputProps}
              />

              <TextField
                fullWidth
                margin="normal"
                name="available"
                label="Available"
                value={values.available}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.available && Boolean(errors.available)}
                helperText={touched.available && errors.available}
                variant="outlined"
                InputProps={inputProps}
              />

              {mode === "view" ? (
                ""
              ) : (
                <Button
                  disabled={isSubmitting}
                  color="success"
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{ backgroundColor: "black" }}
                >
                  Save
                </Button>
              )}
            </form>
          )}
        </Formik>
      </div>
      {mode === "view" ? (
        <div className="authorList">
          <AuthorBookList list={list} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

BookDetails.defaultProps = {
  book: {
    id: null,
    title: "",
    authors: [],
    publishDate: "",
    genre: "",
    rating: 0.0,
    isbn: "",
    pages: 0,
    available: false,
  },
  startingMode: "view",
};

export default BookDetails;
