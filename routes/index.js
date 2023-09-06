const router = require('express').Router();
const apiRoutes = require('./api');

// router.use('/api', apiRoutes); 
//^^uncomment once routes are made. 

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
