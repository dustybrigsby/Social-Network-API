// const { ObjectId } = require('mongoose').Types;
const { User } = require('../models/User');
const { Thought } = require('../models/Thought');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
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
            res.json(thought);
        } catch (error) {
            console.log('getSingleThought failed', error);
            return res.status(500).json(error);
        }
    },

    // Create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findByIdAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true },
            );

            console.log(`${user.username}'s thought created!`);
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

            if (!thought) {
                return res.status(404).json({ message: `No thought exists with ID: ${req.params.thoughtId}` });
            }
            res.json({ message: 'Thought successfully updated' });

        } catch (error) {
            console.log('updateThought failed', error);
            return res.status(500).json(error);
        }
    },

    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);

            if (!thought) {
                return res.status(404).json({ message: `No thought exists with ID: ${req.params.thoughtId}` });
            } else {
                await Thought.findByIdAndDelete(req.params.thoughtId);
                res.json({ message: 'Thought successfully deleted' });
            }

        } catch (error) {
            console.log('deleteThought failed\n', error);
            return res.status(500).json(error);
        }
    },

    // Add a reaction to a thought
    async addReaction(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            const newReaction = await thought.reactions.create(req.body);

            console.log(newReaction);

            thought.reactions.push(newReaction);

            await thought.save();

            console.log('Reaction successfully created');
            res.json(thought.reactions);

        } catch (error) {
            console.log('addReaction failed', error);
            return res.status(500).json(error);
        }
    },

    // Delete a reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);

            thought.reactions.id(req.body.reactionId).deleteOne();

            await thought.save();

            if (!thought) {
                return res.status(404).json({ message: `No user exists with ID: ${req.params.thoughtId}` });
            }

            console.log('Reaction successfully deleted');
            res.json(thought);

        } catch (error) {
            console.log('deleteReaction failed', error);
            return res.status(500).json(error);
        }
    },

};
