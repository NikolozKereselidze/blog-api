import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const createPost = async (req, res) => {
  const { title, content } = req.body;
  const user = req.user;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: user.id,
      },
    });
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = async (req, res) => {
  const user = req.user;
  const posts = await prisma.post.findMany({
    where: {
      authorId: user.id,
    },
    include: {
      author: true,
    },
  });
  console.log(posts);

  res.render("posts", { posts });
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });

  res.json(post);
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      title,
      content,
    },
  });
  res.json(post);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  await prisma.post.delete({
    where: {
      id: id,
    },
  });
  res.json({ message: "Post deleted" });
};
