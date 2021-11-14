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

// router.get(
//   "/:id",
//   asyncHandler(async function (req, res, next) {
//     const imageId = parseInt(req.params.id, 10);
//     const image = await Image.findByPk(req.params.id, {
//       include: db.User,
//       required: true,
//     });
//     const comments = await db.Comment.findAll({
//       include:db.User,
//       where: image
//     })
//     if (image) {
//       return res.json(image);
//     } else {
//       next(imageNotFoundError(req.params.id));
//     }
//   })
// );

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

// router.put(
//   "/:id",
//   validateUpdate,
//   requireAuth,
//   asyncHandler(async function (req, res) {
//     const imageId = parseInt(req.params.id, 10);
//     const image = await Image.findByPk(imageId, {
//       include: db.User,
//       required: true,
//     });

//     const { userId, albumId, imageUrl, content } = req.body;

//     const updatedImage = {
//       userId,
//       albumId,
//       imageUrl,
//       content,
//     };

//     const newImage = await image.update(updatedImage);
//     return res.json(image);
//   })
// );

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
