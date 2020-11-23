const express = require('express');
const authRoutes = require('./auth.route');
const ecommerceRoutes = require('./ecommerce.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * @request method api/v1/users, auth, public, provider,
 */

router.use('/auth', authRoutes);
router.use('/ecommerce', ecommerceRoutes);

module.exports = router;
