const router = require("express").Router();
const { json } = require("express/lib/response");
const { Tag, Product, ProductTag, Category } = require("../../models");

// The `/api/tags` endpoint

//=================Find All tags
// be sure to include its associated Product data
router.get("/", (req, res) => {
  Tag.findAll({
    include: [{ model: Product }],
  }).then((tagData) => {
    res.json(tagData);
  });
});

//=================Find a single Tag by its id
// be sure to include its associated Product data
router.get("/:id", (req, res) => {
  Tag.findByPk(req.params.id, {
    incldue: [{ model: Product }],
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

//=================Create a new tag
router.post("/", (req, res) => {
  Tag.create(req.body).then((newTag) => {
    res.json(newTag);
  });
});

//=================Update a Tag's name by its id value
router.put("/:id", (req, res) => {
  Tag.update(
    {
      Tag_name: req.body.Tag_name,
    },
    {
      id: req.params.id,
    }
  )
    .then((updatedTag) => {
      res.json(updatedTag);
    })
    .catch((err) => {
      res.json(err);
    });
});

//=================Delete a tag by its id value
router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
