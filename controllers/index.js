const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

//If endpoint does not exist, user will get the default 404 
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;