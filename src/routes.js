const health				=	require('./controllers/health');
const categoryController	=	require('./controllers/wasteCategoriesController');
const categoryValidator		=	require('./middlewares/wasteCategoriesValidator');
const router				=	require('express').Router();
const { checkInvalid }		=	require('./middlewares/validationReject');
// const cacheCheck			=	require('./middlewares/cacheCheck');

// System Routes
router.get('/', health.loopback);
router.get('/health', health.check);

// WasteCategories Routes
router.post('/api/category', categoryValidator.categoryValidator, checkInvalid, categoryController.createCategory);
router.get('/api/category', categoryController.getCategories);
router.get('/api/category/:id', categoryController.getCategoryById);
router.put('/api/category/:id', categoryController.updateCategoryById);

module.exports = router;
