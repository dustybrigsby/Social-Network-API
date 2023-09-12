const { ObjectId } = require('mongoose').Types;
const { User } = require('../models/User');
const { Thought } = require('../models/Thought');

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
            // deletes any thoughts posted by the deleted user
            await Thought.deleteMany(
                { userId: req.params.studentId },
            );

            // removes any reactions from the deleted user
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
            const newFriend = User.findOne({ username: req.body.userId });

            const user = User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: newFriend._id } },
                { runValidators: true, new: true },
            );

            if (!user) {
                return res.status(404).json({ message: `No user exists with ID: ${req.params.userId}` });
            }

            if (!newFriend) {
                return res.status(404).json({ message: `No user exists with ID: ${req.body.userId}` });
            }

            console.log(`Added ${newFriend.username} as a friend of ${user.username}`);
            res.json(newFriend);

        } catch (error) {
            console.log('addFriend failed', error);
            return res.status(500).json(error);
        }
    },

    // Remove a friend
    async removeFriend(req, res) {
        try {
            const exFriend = User.findOne({ username: req.body });

            const user = User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: exFriend.userId } },
                { runValidators: true, new: true },
            );

            if (!user) {
                return res.status(404).json({ message: `No user exists with ID: ${req.params.userId}` });
            }

            if (!exFriend) {
                return res.status(404).json({ message: `No user exists with ID: ${req.body}` });
            }

            console.log(`Removed ${exFriend} as a friend of ${user}`);
            res.json(exFriend);

        } catch (error) {
            console.log('removeFriend failed', error);
            return res.status(500).json(error);
        }
    },
};
