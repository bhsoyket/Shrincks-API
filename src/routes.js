const router				=	require('express').Router();
const health				=	require('./controllers/health');
const categoryController	=	require('./controllers/wasteCategoriesController');
const itemsController	    =	require('./controllers/wasteItemsController');
const userController	    =	require('./controllers/userController');

const categoryValidator		=	require('./middlewares/wasteCategoriesValidator');
const itemValidator		    =	require('./middlewares/wasteItemsValidator');
const userValidator		    =	require('./middlewares/userValidator');
const { checkInvalid }		=	require('./middlewares/validationReject');

// System Routes
router.get('/', health.loopback);
router.get('/health', health.check);

// User Routes
router.post('/signup', userValidator.userValidator, checkInvalid, userController.createUser);
router.post('/login', userValidator.loginValidator, checkInvalid, userController.loginUser);
router.get('/api/user', userController.getUsers);
router.get('/api/user/:id', userController.getUserById);
router.put('/api/user/:id', userController.updateUserById);

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

router.post('/detect', itemsController.objectDetect);

module.exports = router;
