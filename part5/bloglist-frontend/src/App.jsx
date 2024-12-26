import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setIsError(true);
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
        setIsError(false);
      }, 5000);
    }
  };

  const handleAddBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create({ title, author, url });
      setBlogs(blogs.concat(newBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
      setIsError(false);
      setErrorMessage(
        `Successfully added new blog ${newBlog.title}, ${newBlog.author}, ${newBlog.url}`
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (exception) {
      setIsError(true);
      setErrorMessage(exception.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
        setIsError(false);
      }, 5000);
      console.log(exception);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogsList = () => {
    return (
      <div>
        <h2>blogs</h2>
        <h3>
          Logged in as {user.username}
          <button
            onClick={() => {
              setUser(null);
              window.localStorage.removeItem("loggedBlogappUser");
            }}
          >
            logout
          </button>
        </h3>

        {blogs
          .filter((blog) => blog.user.username === user.username)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </div>
    );
  };
  return (
    <>
      {user === null ? (
        <>
          <Notification message={errorMessage} isError={isError} />
          {loginForm()}
        </>
      ) : (
        <>
          <Notification message={errorMessage} isError={isError} />
          {blogsList()}{" "}
          <div>
            <h2>create new</h2>
            <form onSubmit={handleAddBlog}>
              <div>
                title
                <input
                  type="text"
                  value={title}
                  name="title"
                  onChange={({ target }) => setTitle(target.value)}
                />
              </div>
              <div>
                author
                <input
                  type="text"
                  value={author}
                  name="author"
                  onChange={({ target }) => setAuthor(target.value)}
                />
              </div>
              <div>
                url
                <input
                  type="text"
                  value={url}
                  name="url"
                  onChange={({ target }) => setUrl(target.value)}
                />
              </div>
              <button type="submit">create</button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default App;
