const asyncHandler = require('express-async-handler');
const Perfume = require('../models/Perfume');

// @desc    Fetch all perfumes
// @route   GET /api/perfumes
// @access  Public
const getPerfumes = asyncHandler(async (req, res) => {
  try {
    console.log('Fetching all perfumes...');
    const perfumes = await Perfume.find({}).lean();
    console.log(`Found ${perfumes.length} perfumes`);
    
    if (!perfumes || perfumes.length === 0) {
      console.log('No perfumes found in database');
      // Return empty array instead of 404 to prevent frontend errors
      return res.json([]);
    }
    
    res.json(perfumes);
  } catch (error) {
    console.error('Error in getPerfumes controller:', error);
    res.status(500);
    throw new Error('Server error fetching perfumes');
  }
});

// @desc    Fetch single perfume
// @route   GET /api/perfumes/:id
// @access  Public
const getPerfumeById = asyncHandler(async (req, res) => {
  try {
    const perfume = await Perfume.findById(req.params.id).lean();

    if (perfume) {
      res.json(perfume);
    } else {
      res.status(404);
      throw new Error('Perfume not found');
    }
  } catch (error) {
    console.error(`Error fetching perfume ${req.params.id}:`, error);
    if (error.kind === 'ObjectId') {
      res.status(404);
      throw new Error('Perfume not found - Invalid ID');
    }
    res.status(500);
    throw new Error('Server error fetching perfume');
  }
});

// @desc    Delete a perfume
// @route   DELETE /api/perfumes/:id
// @access  Private/Admin
const deletePerfume = asyncHandler(async (req, res) => {
  try {
    const perfume = await Perfume.findById(req.params.id);

    if (perfume) {
      await Perfume.deleteOne({ _id: perfume._id });
      res.json({ message: 'Perfume removed' });
    } else {
      res.status(404);
      throw new Error('Perfume not found');
    }
  } catch (error) {
    console.error(`Error deleting perfume ${req.params.id}:`, error);
    res.status(500);
    throw new Error('Server error deleting perfume');
  }
});

// @desc    Create a perfume
// @route   POST /api/perfumes
// @access  Private/Admin
const createPerfume = asyncHandler(async (req, res) => {
  try {
    const perfume = new Perfume({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
      concentration: 'Eau de Parfum',
      notes: {
        top: ['Sample top note'],
        middle: ['Sample middle note'],
        base: ['Sample base note']
      },
      sizeOptions: ['30ml', '50ml', '100ml']
    });

    const createdPerfume = await perfume.save();
    res.status(201).json(createdPerfume);
  } catch (error) {
    console.error('Error creating perfume:', error);
    res.status(500);
    throw new Error('Server error creating perfume');
  }
});

// @desc    Update a perfume
// @route   PUT /api/perfumes/:id
// @access  Private/Admin
const updatePerfume = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
      concentration,
      notes,
      sizeOptions
    } = req.body;

    const perfume = await Perfume.findById(req.params.id);

    if (perfume) {
      perfume.name = name || perfume.name;
      perfume.price = price || perfume.price;
      perfume.description = description || perfume.description;
      perfume.image = image || perfume.image;
      perfume.brand = brand || perfume.brand;
      perfume.category = category || perfume.category;
      perfume.countInStock = countInStock || perfume.countInStock;
      perfume.concentration = concentration || perfume.concentration;
      perfume.notes = notes || perfume.notes;
      perfume.sizeOptions = sizeOptions || perfume.sizeOptions;

      const updatedPerfume = await perfume.save();
      res.json(updatedPerfume);
    } else {
      res.status(404);
      throw new Error('Perfume not found');
    }
  } catch (error) {
    console.error(`Error updating perfume ${req.params.id}:`, error);
    res.status(500);
    throw new Error('Server error updating perfume');
  }
});

// @desc    Create new review
// @route   POST /api/perfumes/:id/reviews
// @access  Private
const createPerfumeReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const perfume = await Perfume.findById(req.params.id);

    if (perfume) {
      const alreadyReviewed = perfume.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error('Perfume already reviewed');
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      perfume.reviews.push(review);

      perfume.numReviews = perfume.reviews.length;

      perfume.rating =
        perfume.reviews.reduce((acc, item) => item.rating + acc, 0) /
        perfume.reviews.length;

      await perfume.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404);
      throw new Error('Perfume not found');
    }
  } catch (error) {
    console.error(`Error creating review for perfume ${req.params.id}:`, error);
    res.status(500);
    throw new Error('Server error creating review');
  }
});

// @desc    Get top rated perfumes
// @route   GET /api/perfumes/top
// @access  Public
const getTopPerfumes = asyncHandler(async (req, res) => {
  try {
    const perfumes = await Perfume.find({}).sort({ rating: -1 }).limit(3).lean();
    console.log(`Found ${perfumes.length} top perfumes`);
    res.json(perfumes);
  } catch (error) {
    console.error('Error fetching top perfumes:', error);
    res.status(500);
    throw new Error('Server error fetching top perfumes');
  }
});

module.exports = {
  getPerfumes,
  getPerfumeById,
  deletePerfume,
  createPerfume,
  updatePerfume,
  createPerfumeReview,
  getTopPerfumes,
}; 