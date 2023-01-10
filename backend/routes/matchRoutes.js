const express = require('express')
const router = express.Router()
const { getMatchs, setMatch, updateMatch, deleteMatch } = require('../controllers/matchController')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getMatchs)

router.post('/', protect, setMatch)

router.put('/:id', protect, updateMatch)

router.delete('/:id', protect, deleteMatch)

module.exports = router