const router				=	require('express').Router();
const health				=	require('./controllers/health');
const categoryController	=	require('./controllers/wasteCategoriesController');
const itemsController	    =	require('./controllers/wasteItemsController');

const categoryValidator		=	require('./middlewares/wasteCategoriesValidator');
const itemValidator		    =	require('./middlewares/wasteItemsValidator');
const { checkInvalid }		=	require('./middlewares/validationReject');

// System Routes
router.get('/', health.loopback);
router.get('/health', health.check);

// WasteCategories Routes
router.post('/api/category', categoryValidator.categoryValidator, checkInvalid, categoryController.createCategory);
router.get('/api/category', categoryController.getCategories);
router.get('/api/category/:id', categoryController.getCategoryById);
router.put('/api/category/:id', categoryController.updateCategoryById);

// WasteItems Routes
router.post('/api/item', itemValidator.itemValidator, checkInvalid, itemsController.createItem);
router.get('/api/item', itemsController.getItems);
router.get('/api/item/:id', itemsController.getItemById);
router.put('/api/item/:id', itemsController.updateItemById);

module.exports = router;
