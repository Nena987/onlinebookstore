import AdapterLuxon from "@mui/lab/AdapterLuxon";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import "./App.css";
import BookDetails from "./BookDetails";
import AllBooksPage from "./AllBooksPage";
import AuthorSearchPage from "./AuthorSearchPage";
import CategorySearchPage from "./CategorySearchPage";
import { CardMedia } from "@mui/material";
import image from "./Home.png";
import {
  BrowserRouter as Router,
  Link as RouterLink,
  Switch,
  Route,
  useHistory,
  Redirect,
  useLocation,
} from "react-router-dom";

import { Button } from "@mui/material";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { addBook } from "./accessHooks";
import BookDetailsPage from "./BookDetailsPage";
import BookSearchPage from "./BookSearchPage";
import { useValidatePassword } from "./validationTools";

import { useAuth, ProvideAuth } from "./useAuth";
import { Formik } from "formik";
import { TextField } from "@mui/material";
import { useState } from "react";

const AuthButton = () => {
  const [login, error, signin, signout] = useAuth();
  const history = useHistory();
  if (login) {
    return (
      <Button
        variant="contained"
        color="success"
        sx={{
          marginLeft: "10px",
          marginRight: "10px",
          backgroundColor: "black",
        }}
        onClick={() => {
          signout(() => history.push("/"));
        }}
      >
        Sign out
      </Button>
    );
  } else {
    return (
      <div className="mainNav">
        <Button
          variant="contained"
          color="success"
          component={RouterLink}
          to="/login"
          sx={{
            backgroundColor: "black",
            marginLeft: "10px",
          }}
        >
          Log in
        </Button>
        <Button
          variant="contained"
          color="success"
          component={RouterLink}
          to="/register"
          sx={{
            backgroundColor: "black",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          Register
        </Button>
      </div>
    );
  }
};

const ShowCategories = () => {
  const [login, error, signin, signout] = useAuth();
  if (login) {
    return (
      <div>
        <div className="genre">
          <Button
            fullWidth
            color="inherit"
            variant="text"
            component={RouterLink}
            to="/Science Fiction"
          >
            Science Fiction
          </Button>
        </div>

        <div className="genre">
          <Button
            fullWidth
            color="inherit"
            variant="text"
            component={RouterLink}
            to="/Fantasy"
          >
            Fantasy
          </Button>
        </div>
        <div className="genre">
          <Button
            fullWidth
            color="inherit"
            variant="text"
            component={RouterLink}
            to="/Horror"
          >
            Horror
          </Button>
        </div>
        <div className="genre">
          <Button
            fullWidth
            color="inherit"
            variant="text"
            component={RouterLink}
            to="Mystery"
          >
            Mystery
          </Button>
        </div>
        <div className="genre">
          <Button
            fullWidth
            color="inherit"
            variant="text"
            component={RouterLink}
            to="/Computing"
          >
            Computing
          </Button>
        </div>
      </div>
    );
  } else return <div></div>;
};

const PrivateRoute = ({ children, ...rest }) => {
  const [login, error, signin, signout] = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (login) {
          return children;
        } else {
          return (
            <Redirect to={{ pathname: "/login", state: { from: location } }} />
          );
        }
      }}
    />
  );
};

const LoginBox = () => {
  const history = useHistory();
  const location = useLocation();
  const [login, error, signin, signout] = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };
  return (
    <div className="loginBox">
      <h3>Login Details</h3>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          signin(
            values.username,
            values.password,
            () => {
              setSubmitting(false);
            },
            () => {
              history.replace(from);
            }
          );
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
            <TextField
              fullWidth
              variant="outlined"
              name="username"
              value={values.username}
              label="Username"
              onChange={handleChange}
            />
            <br />
            <TextField
              fullWidth
              variant="outlined"
              name="password"
              value={values.password}
              label="Password"
              onChange={handleChange}
              type="password"
            />
            <br />
            <Button
              fullWidth
              variant="contained"
              color="success"
              type="submit"
              disabled={isSubmitting}
              sx={{ backgroundColor: "black" }}
            >
              Log in
            </Button>
            <div>{error ? error : ""}</div>
          </form>
        )}
      </Formik>
    </div>
  );
};

const RegisterBox = () => {
  const [pass, setPass] = useState("");
  const history = useHistory();
  const location = useLocation();
  const counter = useValidatePassword(pass);
  const [
    login,
    error,
    signin,
    signout,
    registerUser,
    checkUsername,
    checkName,
  ] = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };
  return (
    <div className="registerBox">
      <h3>Registration Form</h3>
      <Formik
        initialValues={{ username: "", password: "", repeated: "" }}
        validate={(values) => {
          setPass(values.password);
          const errors = {};
          if (!values.username) {
            errors.username = "Username cannont be blank";
          }
          checkUsername(values.username);
          if (checkName) {
            errors.username = "Username is already taken.";
          }
          if (values.password != values.repeated) {
            errors.password = "Passwords do not match.";
          }
          if (counter < 4) {
            errors.password = "Password strength is less then 60%.";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          registerUser(
            values.username,
            values.password,
            values.repeated,
            () => {
              setSubmitting(false);
            },
            () => {
              history.replace(from);
            }
          );
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
            <TextField
              fullWidth
              variant="outlined"
              name="username"
              value={values.username}
              label="Username"
              onChange={handleChange}
            />
            <br />
            <TextField
              fullWidth
              variant="outlined"
              name="password"
              value={values.password}
              label="Password"
              onChange={handleChange}
              type="password"
            />
            <div className="pass">
              <meter
                className="password"
                color="black"
                min="0"
                max="6"
                value={counter}
              />
            </div>
            <br />
            <TextField
              fullWidth
              variant="outlined"
              name="repeated"
              value={values.repeated}
              label="Repeated Password"
              onChange={handleChange}
              type="password"
            />
            <br />
            <Button
              fullWidth
              variant="contained"
              color="success"
              type="submit"
              disabled={isSubmitting}
              sx={{ backgroundColor: "black" }}
            >
              Register
            </Button>
            <div>
              {errors.username && touched.username ? errors.username : ""}
              <br />
              {errors.password && touched.password ? errors.password : ""}
              <br />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

const AddBookDetails = () => {
  const [login] = useAuth();
  return (
    <BookDetails
      startingMode="create"
      action={(book) => {
        book.authors = String(book.authors).split(", ");
        return addBook(book, login);
      }}
    />
  );
};

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <ProvideAuth>
        <Router>
          <div className="bookstore">
            <div className="main">
              <div className="header">
                <h1 className="title">ONLINE BOOKSTORE</h1>
                <nav className="mainNav">
                  <Button
                    component={RouterLink}
                    to="/"
                    variant="contained"
                    color="success"
                    sx={{
                      marginLeft: "10px",
                      backgroundColor: "black",
                    }}
                  >
                    Home
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/allbooks"
                    variant="contained"
                    color="success"
                    sx={{
                      marginRight: "10px",
                      marginLeft: "10px",
                      backgroundColor: "black",
                    }}
                  >
                    All Books
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/searchbooks"
                    variant="contained"
                    color="success"
                    sx={{ backgroundColor: "black" }}
                  >
                    Search
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/author"
                    variant="contained"
                    color="success"
                    sx={{ marginLeft: "10px", backgroundColor: "black" }}
                  >
                    Author search
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/books/new"
                    variant="contained"
                    color="success"
                    sx={{
                      marginRight: "10px",
                      marginLeft: "10px",
                      backgroundColor: "black",
                    }}
                  >
                    Add New Book
                  </Button>
                  <span style={{ flexGrow: 1 }} />
                  <AuthButton
                    className="mainNav"
                    color="success"
                    sx={{ marginLeft: "10px", marginRight: "10px" }}
                  ></AuthButton>
                </nav>
              </div>
              <div className="mainContainer">
                <div className="menu">
                  <ShowCategories></ShowCategories>
                </div>
                <div className="books">
                  <div className="mainContent">
                    <Switch>
                      <Route exact path="/">
                        <CardMedia
                          component="img"
                          image={image}
                          alt="Background"
                          height="800px"
                          title="Background"
                        />
                      </Route>
                      <Route exact path="/login">
                        <LoginBox />
                      </Route>
                      <Route exact path="/register">
                        <RegisterBox />
                      </Route>
                      <PrivateRoute exact path="/allbooks">
                        <AllBooksPage />
                      </PrivateRoute>
                      <PrivateRoute exact path="/searchbooks">
                        <BookSearchPage />
                      </PrivateRoute>
                      <PrivateRoute exact path="/author">
                        <AuthorSearchPage />
                      </PrivateRoute>
                      <PrivateRoute exact path="/Science Fiction">
                        <CategorySearchPage category={"Science Fiction"} />
                      </PrivateRoute>
                      <PrivateRoute exact path="/Fantasy">
                        <CategorySearchPage category={"Fantasy"} />
                      </PrivateRoute>
                      <PrivateRoute exact path="/Horror">
                        <CategorySearchPage category={"Horror"} />
                      </PrivateRoute>
                      <PrivateRoute exact path="/Mystery">
                        <CategorySearchPage category={"Mystery"} />
                      </PrivateRoute>
                      <PrivateRoute exact path="/Computing">
                        <CategorySearchPage category={"Computing"} />
                      </PrivateRoute>
                      <PrivateRoute exact path="/books/new">
                        <AddBookDetails />
                      </PrivateRoute>
                      <PrivateRoute exact path="/book/:cid/:operation">
                        <BookDetailsPage />
                      </PrivateRoute>
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Router>
      </ProvideAuth>
    </LocalizationProvider>
  );
}

export default App;
