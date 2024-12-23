const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const accumulate = (sum, blog) => {
    return sum + blog.likes;
  };

  return blogs.reduce(accumulate, 0);
};

const favoriteBlog = (blogs) => {
  let fav = {
    likes: -1,
  };
  for (const i of blogs) {
    if (i.likes > fav.likes) fav = i;
  }
  return fav;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
