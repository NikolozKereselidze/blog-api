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

  res.json(posts);
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
  const user = req.user;

  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (post.authorId !== user.id) {
    return res
      .status(403)
      .json({ message: "You are not authorized to update this post" });
  }

  const updatedPost = await prisma.post.update({
    where: { id },
    data: { title, content },
  });

  res.json(updatedPost);
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
