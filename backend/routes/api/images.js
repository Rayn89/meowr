const express = require("express");
const asyncHandler = require("express-async-handler");
const { Image } = require("../../db/models");
// const db = require("../../db/models");

const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth")

const userId = check("id").notEmpty().isInt({ min: 0 });
const albumId = check("albumId").notEmpty().isInt({ min: 0 });
const imageUrl = check("imageUrl")
  .notEmpty()
  .isURL({ require_protocol: false, require_host: false });
const content = check("content").notEmpty();

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
    const images = await Image.findAll();
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
  asyncHandler(async function (req, res) {
    const image = await Image.findByPk(req.params.id);
    return res.json(image);
  })
);

router.post(
  "/addimage", requireAuth, validateCreate,
  asyncHandler(async function (req, res) {
    const id = await Image.create(req.body);
    return res.redirect(`${req.baseUrl}/${id}`);
  })
);

router.put(
  "/:id",
  validateUpdate,
  requireAuth,
  asyncHandler(async function (req, res) {
    const imageId = parseInt(req.params.id, 10);
    const image = await Image.findByPk(imageId);

    const { albumId, imageUrl, content } = req.body;

    const updatedImage = {
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
  asyncHandler(async (req, res) => {
    const imageId = parseInt(req.params.id, 10);
    const image = await Image.findByPk(imageId);

    if (!image) {
      const err = new Error("Not Found");
      err.status = 404;
      throw err;
    }
    // if (res.locals.user.id !== image.userId) {
    //   const err = new Error("Not Authorized");
    //   err.status = 401;
    //   throw err;
    // }

    // const answers = await db.Answer.findAll({
    //   where: { questionId },
    // });

    // let answerIds = answers.map((answer) => {
    //   return answer.dataValues.id;
    // });

    // await db.Vote.destroy({
    //   where: {
    //     answerId: answerIds,
    //   },
    // });

    // await db.Answer.destroy({
    //   where: {
    //     questionId,
    //   },
    // });

    await image.destroy();
    res.redirect("/images");
  })
);




module.exports = router;
