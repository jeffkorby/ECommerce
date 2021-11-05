const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

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
  try {
    const categoryData = await Category.update(
      req.body, {
        where: {
          id: req.params.id
        },
      });
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with that ID!' });
        return;
      }
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(400).json(err);
    }
  });


// Deletes/Destroys a category by ID
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
        where: {
          id: req.params.id
        },
      });
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with that ID!' });
        return;
      }
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;
