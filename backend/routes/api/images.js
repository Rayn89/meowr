const express = require("express");
const asyncHandler = require("express-async-handler");
const { Image } = require("../../db/models");
const db = require("../../db/models");

const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth")

const userId = check("userId").notEmpty().isInt({ min: 0 });
const albumId = check("albumId").notEmpty().isInt({ min: 0 });
const imageUrl = check("imageUrl")
  .notEmpty()
  .isURL({ require_protocol: false, require_host: false });
const content = check("content").notEmpty();

const imageNotFoundError = (id) => {
  const err = Error("Image not found");
  err.errors = [`Image with id of ${id} could not be found.`];
  err.title = "Image not found.";
  err.status = 404;
  return err;
};

const validateCreate = [
    userId,
    albumId,
    imageUrl,
    content,
    handleValidationErrors,
];

const validateUpdate = [
    userId, 
    albumId, 
    imageUrl, 
    content, 
    handleValidationErrors
];

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const images = await Image.findAll(
        {include:db.User}
        );
    res.json(images)
  })
);

// router.get(
//   "/addImage",
//   requireAuth,
//   csrfProtection,
//   asyncHandler(async (req, res) => {
//     const image = Image.build();
//     res.render("question-ask", {
//       question,
//       csrfToken: req.csrfToken(),
//     });
//   })
// );

router.get(
  "/:id",
  asyncHandler(async function (req, res, next) {
    const image = await Image.findByPk(req.params.id, {include:db.User, required: true});
    if(image){
    return res.json(image);
    }else{
    next(imageNotFoundError(req.params.id))
    }
  })
);

router.post(
  "/addimage", 
  requireAuth, 
  validateCreate,
  asyncHandler(async function (req, res) {
    const id = await Image.create(req.body, {include:db.User, required: true});
    return res.json(id);
  })
);


router.put(
  "/:id",
  validateUpdate,
    requireAuth,
  asyncHandler(async function (req, res) {

      const imageId = parseInt(req.params.id, 10);
      const image = await Image.findByPk(imageId);

      const { userId, albumId, imageUrl, content } = req.body;

      const updatedImage = {
        userId,
        albumId,
        imageUrl,
        content,
      };
      await image.update(updatedImage);
      return res.json(image);
    })
);

router.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const imageId = parseInt(req.params.id, 10);
    const image = await Image.findByPk(imageId);

    if (image) {
      await image.destroy();
      res.status(204).end()
    }else{
        next(imageNotFoundError(req.params.id))
    }

    // await image.destroy();
    // res.redirect("/images");
  })
);




module.exports = router;
