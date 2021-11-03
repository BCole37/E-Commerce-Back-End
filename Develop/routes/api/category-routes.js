const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//miniproject and activity 23
router.get('/', (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
        include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
} catch (err) {
    res.status(500).json(err);
}
  // be sure to include its associated Products
});

//miniproject and activity 23
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
  });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

//activity 5
router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((newCategory) => {
    res.json(newCategory);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
