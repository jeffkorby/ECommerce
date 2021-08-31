const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  const categoryData = await Category.update(
    {
      id: req.body.id,
      name: req.body.name,
    },
    {
      where: {
        category_id: req.params.category_id,
      },
    }
  );
  res.json(updatedCategory);
});

router.delete('/:id', async (req, res) => {
  const deleteCategory = await Category.destroy({
    where: {
      category_id: req.params.category_id,
    },
  });
  res.json(deleteCategory);
});

module.exports = router;
