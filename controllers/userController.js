const { User } = require('../models/User');
const { Thought } = require('../models/Thought');

module.exports = {
    // Get all users
    async getUsers(req, res) {
        console.log('Here');
        try {
            const users = await User.find();

            if (!users) {
                return res.status(404).json(
                    { message: 'No users found!' }
                );
            }

            console.log('Returning all users');
            return res.json(users);

        } catch (error) {
            console.log('getUsers failed', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findById(
                req.params.userId
            );
            if (!user) {
                return res.status(404).json(
                    { message: 'No user with that ID' }
                );
            }
            res.json(user);

        } catch (error) {
            console.log('getSingleUser failed', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);

        } catch (error) {
            console.log('createUser failed', error);
            return res.status(500).json({ error: 'Internal server error' });
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
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Delete a  user
    async deleteUser(req, res) {
        try {
            const user = await User.findById(req.params.userId);

            if (!user) {
                return res.status(404).json({ message: `No user exists with ID: ${req.params.userId}` });
            }
            // deletes any thoughts posted by the deleted user
            await Thought.deleteMany(
                { userId: req.params.userId },
            );

            // removes any reactions from the deleted user
            await Thought.updateMany(
                {
                    $pull: {
                        reactions: { username: user.username }
                    }
                }
            );
            await User.findByIdAndDelete(req.params.userId);
            res.json({ message: 'User successfully deleted' });

        } catch (error) {
            console.log('deleteUser failed', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Add another user as a friend
    async addFriend(req, res) {
        try {
            const newFriend = await User.findById(
                { _id: req.body.friendId }
            );

            const user = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: newFriend._id } },
                { runValidators: true, new: true },
            );

            if (!user) {
                return res.status(404).json(
                    { message: `No user exists with ID: ${req.params.userId}` }
                );
            }

            if (!newFriend) {
                return res.status(404).json(
                    { message: `No user exists with ID: ${req.body.friendId}` }
                );
            }

            console.log(`Added ${newFriend.username} as a friend of ${user.username}`);
            res.json(user.friends);

        } catch (error) {
            console.error('addFriend failed', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Remove a friend
    async removeFriend(req, res) {
        try {
            const exFriend = await User.findById(
                { _id: req.body.friendId }
            );

            const user = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: exFriend._id } },
                { runValidators: true, new: true },
            );

            if (!user) {
                return res.status(404).json({ message: `No user exists with ID: ${req.params.userId}` });
            }

            if (!exFriend) {
                return res.status(404).json({ message: `No user exists with ID: ${req.body.friendId}` });
            }

            console.log(`Removed ${exFriend} as a friend of ${user}`);
            res.json(user.friends);

        } catch (error) {
            console.error('removeFriend failed', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
};
