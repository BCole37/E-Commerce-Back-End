const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//miniproject and activity 23
router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
        include: [{ model: Product }]
    });
    res.status(200).json(tagData);
} catch (err) {
    res.status(500).json(err);
}
  // be sure to include its associated Product data
});

//miniproject and activity 23
router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
  });
    if (!tagData) {
      res.status(404).json({ message:'No tag found with this id!'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

//activity 5
router.post('/', async (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((newTag) => {
    res.json(newTag);
  })
  .catch((err) => {
    res.json(err);
  });
});

//activity 7
router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      Tag_name: req.body.Tag_name
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .then((updatedTag) => {
    res.json(updatedTag);
  })
  .catch((err) => res.json(err));
});

//activity 7
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy(
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then((deletedTag) => {
    res.json(deletedTag);
  })
  .catch((err) => res.json(err));
});

module.exports = router;
