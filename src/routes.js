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
// router.get('/api/v1/pvt/coupons', categoryController.getCoupons);
// router.get('/api/v1/pvt/coupons/user-list', categoryController.getCouponUserList);
// router.get('/api/v1/pvt/coupons/coupon-list/:userId', categoryController.getUserCouponList);
// router.post('/coupons/valid', categoryController.couponValidityCheck);
// router.get('/api/v1/pvt/coupons/:id', cacheCheck, categoryController.getCouponById);
// router.put('/api/v1/pvt/coupons/:id', categoryController.updateCouponById);
// router.delete('/api/v1/pvt/coupons/:id', categoryController.deleteCouponById);
// router.delete('/api/v1/pvt/coupons/:id/delete', categoryController.removeCouponById);
// router.put('/api/v1/pvt/coupons/:id/restore', categoryController.restoreCouponById);

module.exports = router;
