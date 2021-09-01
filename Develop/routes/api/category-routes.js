const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Finds all the categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [
        {
          model: Product,
          attributes:['id', 'product_name', 'price', 'stock', 'category_id'],
        },
      ],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Finds a category by ID
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        },
      ],
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

// Creates a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name});
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Updates a category
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

// Deletes/Destroys a category
router.delete('/:id', async (req, res) => {
  const deleteCategory = await Category.destroy({
    where: {
      category_id: req.params.category_id,
    },
  });
  res.json(deleteCategory);
});

module.exports = router;
