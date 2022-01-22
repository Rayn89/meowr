const express = require("express");
const asyncHandler = require("express-async-handler");
const { Image } = require("../../db/models");

const db = require("../../db/models");

const router = express.Router();
const { setTokenCookie, restoreUser } = require("../../utils/auth");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");

const userId = check("userId").notEmpty().isInt({ min: 0 }).withMessage("Hey");
const albumId = check("albumId")
  .notEmpty()
  .isInt({ min: 0 })
  .withMessage("yeah");
const imageUrl = check("imageUrl")
  .isURL({ require_protocol: false, require_host: false })
  .withMessage("Please enter valid image URL.");
const content = check("content")
  .isLength({ min: 1, max: 20 })
  .withMessage("Title must be between 1 to 20 characters");

const commentNotFoundError = (id) => {
  const err = Error("Image not found");
  err.errors = [`Image with id of ${id} could not be found.`];
  err.title = "Image not found.";
  err.status = 404;
  return err;
};

const validateCreate = [
//   userId,
//   albumId,
//   imageUrl,
//   content,
//   handleValidationErrors,
];

const validateUpdate = [content, handleValidationErrors];

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const comments = await db.Comment.findAll({
      include: [{ model: db.Image, required: true }, { model: db.User, required: true }],
    });
    res.json(comments);
  })
);

router.put(
  "/:id",
  requireAuth,
  asyncHandler(async function (req, res) {
    const findCommentId = parseInt(req.params.id, 10);
    const comment1 = await db.Comment.findByPk(
      findCommentId,
      // { include: db.User, required: true },
      // { include: db.Comment, required: true }
    );

    const { userId ,imageId, comment, commentId } = req.body;

    const updatedComment = {
      imageId,
      comment,
      userId
    };

    const newImage = await comment1.update(updatedComment);
    return res.json(newImage);
  })
);

router.post(
  "/",
  requireAuth,
  validateCreate,
  asyncHandler(async function (req, res) {
    const comment = await db.Comment.create(req.body, {
      include: db.User,
      required: true,
    });
    const returnComment = await db.Comment.findByPk(comment.id, {include: db.User, required: true})
    return res.json(returnComment);
  })
);


router.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const commentId = parseInt(req.params.id, 10);
    const comment = await db.Comment.findByPk(commentId);

    if (comment) {
      await comment.destroy();
      res.status(204).end();
    } else {
      next(imageNotFoundError(req.params.id));
    }

    // await image.destroy();
    // res.redirect("/images");
  })
);

module.exports = router;
