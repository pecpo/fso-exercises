const { test, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Amazing",
    author: "J.K. Rowling",
    url: "String",
    likes: 4,
  },
  {
    title: "Sugoi",
    author: "George R.R. Martin",
    url: "String",
    likes: 10,
  },
  {
    title: "Epic",
    author: "Me",
    url: "String",
    likes: 12,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of initialBlogs) {
    const toSave = Blog(blog);
    await toSave.save();
  }
});

test("returns all blogs", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, initialBlogs.length);
});

test("identifier property is named id and not _id", async () => {
  const response = await api.get("/api/blogs");
  assert(response.body.length > 0);
  assert(response.body[0].id);
});

test("post request works succesfully", async () => {
  const blogToSave = {
    title: "Goofy",
    author: "Kanye West",
    url: "String",
    likes: 5,
  };
  await api.post("/api/blogs").send(blogToSave).expect(201);

  const response = await api.get("/api/blogs");
  const savedBlog = response.body.find(
    (blog) =>
      blog.title === blogToSave.title &&
      blog.author === blogToSave.author &&
      blog.url === blogToSave.url &&
      blog.likes === blogToSave.likes
  );
  assert(savedBlog);
  assert.strictEqual(initialBlogs.length + 1, response.body.length);
});

test("to see if note gets deleted", async () => {
  const blogs = await Blog.find({});
  const blogToDelete = blogs[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await Blog.find({});
  assert.strictEqual(blogsAtEnd.length, blogs.length - 1);
  const contents = blogsAtEnd.map((r) => r.id);
  assert(!contents.includes(blogToDelete.id));
});

test("to see if note gets updated", async () => {
  const blogs = await Blog.find({});
  const blogToUpdate = blogs[0];
  const updatedBlog = {
    title: "Goofy",
    author: "Kanye West",
    url: "String",
    likes: 5,
  };
  await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog);
  const newBlogs = await Blog.find({});
  const authors = newBlogs.map((r) => r.author);
  assert(authors.includes(updatedBlog.author));
});

after(async () => {
  await mongoose.connection.close();
});
