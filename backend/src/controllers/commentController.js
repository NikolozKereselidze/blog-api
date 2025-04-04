import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const createComment = async (req, res) => {
  const { postId } = req.params;
  console.log(req.body);
  const { message } = req.body;
  const user = req.user;
  try {
    const commentData = await prisma.comment.create({
      data: {
        message,
        postId,
        authorId: user.id,
      },
    });
    res.json(commentData);
  } catch (error) {
    console.log(error);
  }
};

export const getComments = async (req, res) => {
  const { postId } = req.params;
  const comments = await prisma.comment.findMany({
    where: {
      postId: postId,
    },
  });
  res.json(comments);
};

export const updateComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const { message } = req.body;
  const comment = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      message,
    },
  });
  res.json(comment);
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
  res.status(200).json({ message: "Comment deleted successfully" });
};
