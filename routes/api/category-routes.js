const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

//=================Find all categories
// be sure to include its associated Products
router.get("/", (req, res) => {
  Category.findAll({
    include: [{ model: Product }],
  }).then((categoryData) => {
    res.json(categoryData);
  });
});

//=================Find category by id value
// be sure to include its associated Products
router.get("/:id", (req, res) => {
  Category.findByPk(req.params.id, { include: [{ model: Product }] }).then(
    (data) => {
      res.json(data);
    }
  );
});

//=================Create a new category
router.post("/", (req, res) => {
  Category.create(req.body)
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((err) => {
      res.json(err);
    });
});

//=================Update a category by its id value
router.put("/:id", (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where:{
      id: req.params.id,
      }
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => {
      res.json(err);
    });
});

//=================Delete a category by its id value
router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
