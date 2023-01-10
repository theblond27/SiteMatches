const asyncHandler = require('express-async-handler')

const Match = require('../models/matchModel')
const User = require('../models/userModel')

// @desc    Get matchs
// @route   GET /api/matchs
// @acess   Private
const getMatchs = asyncHandler(async (req, res) => {
    const goals = await Match.find({ user: req.user.id })
    res.status(200).json(goals)
})

// @desc    Set match
// @route   POST /api/matchs
// @acess   Private
const setMatch = asyncHandler(async (req, res) => {
    if (!req.body.title || !req.body.date || !req.body.place || !req.body.text || !req.body.price) {
        res.status(400)
        throw new Error('Please add a text fields')
    }

    const match = await Match.create({
        user: req.user.id,
        title: req.body.title,
        date: req.body.date,
        places: req.body.place,
        text: req.body.text,
        price: req.body.price,
    })
    res.status(200).json(match)
})

// @desc    Update match
// @route   PUT /api/matchs/:id
// @acess   Private
const updateMatch = asyncHandler(async (req, res) => {
    const match = await Match.findById(req.params.id)

    if (!match) {
        res.status(400)
        throw new Error('Match not found')
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches can update matches
    if (match.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedMatch = await Match.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedMatch)
})

// @desc    Delete match
// @route   DELETE /api/matchs/:id
// @acess   Private
const deleteMatch = asyncHandler(async (req, res) => {
    const match = await Match.findById(req.params.id)

    if (!match) {
        res.status(400)
        throw new Error('Match not found')
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches can update matches
    if (match.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await Match.remove()

    res.status(200).json({ id: req.params.id })
})



module.exports = {
    getMatchs,
    setMatch,
    updateMatch,
    deleteMatch
}