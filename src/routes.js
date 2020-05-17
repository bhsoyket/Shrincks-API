const health				=	require('./controllers/health');
const couponController		=	require('./controllers/couponController');
const couponValidator		=	require('./middlewares/couponValidator');
const router				=	require('express').Router();
const { checkInvalid }		=	require('./middlewares/validationReject');
const cacheCheck			=	require('./middlewares/cacheCheck');

// System Routes
router.get('/', health.loopback);
router.get('/health', health.check);

// // Coupons Routes
// router.post('/api/v1/pvt/coupons', couponValidator.couponValidator, checkInvalid, couponController.createCoupon);
// router.get('/api/v1/pvt/coupons', couponController.getCoupons);
// router.get('/api/v1/pvt/coupons/user-list', couponController.getCouponUserList);
// router.get('/api/v1/pvt/coupons/coupon-list/:userId', couponController.getUserCouponList);
// router.post('/coupons/valid', couponController.couponValidityCheck);
// router.get('/api/v1/pvt/coupons/:id', cacheCheck, couponController.getCouponById);
// router.put('/api/v1/pvt/coupons/:id', couponController.updateCouponById);
// router.delete('/api/v1/pvt/coupons/:id', couponController.deleteCouponById);
// router.delete('/api/v1/pvt/coupons/:id/delete', couponController.removeCouponById);
// router.put('/api/v1/pvt/coupons/:id/restore', couponController.restoreCouponById);

module.exports = router;
