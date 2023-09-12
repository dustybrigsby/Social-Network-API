const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');



module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            return res.json(users);

        } catch (error) {
            console.log('getUsers failed', error);
            return res.status(500).json(error);
        }
    },

    // Get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findById(req.params.userId);
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);

        } catch (error) {
            console.log('getSingleUser failed', error);
            return res.status(500).json(error);
        }
    },

    // Create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);

        } catch (error) {
            console.log('createUser failed', error);
            return res.status(500).json(error);
        }
    },

    // Update a user
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                req.body,
            );
            res.json(user);

        } catch (error) {
            console.log('updateUser failed', error);
            return res.status(500).json(error);
        }
    },

    // Delete a  user
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.userId);
            if (!user) {
                return res.status(404).json({ message: `No user exists with ID: ${req.params.userId}` });
            }

            await Thought.deleteMany(
                { userId: req.params.studentId },
            );

            await Thought.updateMany(
                {
                    $pull: {
                        reactions: { userId: req.params.userId }
                    }
                }
            );

        } catch (error) {
            console.log('deleteUser failed', error);
            return res.status(500).json(error);
        }
    },

    // Add another user as a friend
    async addFriend(req, res) {
        try {

        } catch (error) {
            console.log('addFriend failed', error);
            return res.status(500).json(error);
        }
    },

    // Remove a friend
    async removeFriend(req, res) {
        try {

        } catch (error) {
            console.log('removeFriend failed', error);
            return res.status(500).json(error);
        }
    },

};
