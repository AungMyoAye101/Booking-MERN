const router = require("express").Router();
const { searchController } = require("../controller/search");

router.get('/', searchController)

module.exports = router;