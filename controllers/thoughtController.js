const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');



module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await User.find();
            return res.json(thoughts);

        } catch (error) {
            console.log('getThoughts failed', error);
            return res.status(500).json(error);
        }
    },

    // Get a single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(user);
        } catch (error) {
            console.log('getSingleThought failed', error);
            return res.status(500).json(error);
        }
    },

    // Create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);

        } catch (error) {
            console.log('createThought failed', error);
            return res.status(500).json(error);
        }
    },

    // Update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                req.body,
            );
            res.json(thought);

        } catch (error) {
            console.log('updateThought failed', error);
            return res.status(500).json(error);
        }
    },

    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: `No thought exists with ID: ${req.params.thoughtId}` });
            }

        } catch (error) {
            console.log('deleteThought failed', error);
            return res.status(500).json(error);
        }
    },

    // Add a reaction to a thought
    async addReaction(req, res) {
        try {

        } catch (error) {
            console.log('addReaction failed', error);
            return res.status(500).json(error);
        }
    },

    // Delete a reaction
    async deleteReaction(req, res) {
        try {

        } catch (error) {
            console.log('deleteReaction failed', error);
            return res.status(500).json(error);
        }
    },

};
