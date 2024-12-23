const { test, describe } = require("node:test");
const assert = require("node:assert");

const listHelper = require("../utils/list_helper");

const blogs = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/",
    likes: 4,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a6sd234d17f8",
    title: "asdf",
    author: "erm",
    url: "https://homepages.cwi.nl/~storm/teaching/",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422adf1b54a676234d17f8",
    title: "dfghdfg",
    author: "amogus",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/",
    likes: 5,
    __v: 0,
  },
];

describe("favorite blog", () => {
  test("return blog with most likes, return any if multiple blogs with most likes", () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[1]);
  });
});
