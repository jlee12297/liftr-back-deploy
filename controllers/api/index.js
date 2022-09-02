const router = require('express').Router();

const coachRoutes = require('./coachRoutes');

const clientRoutes = require('./clientRoutes');
const exerciseRoutes = require('./exerciseRoutes');

router.use('/coaches', coachRoutes);

router.use('/clients', clientRoutes);
router.use('/exercises', exerciseRoutes);

module.exports = router;
