const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');



module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {

        } catch (error) {
            console.log('getUsers failed', error);
            return res.status(500).json(error);
        }
    },

    // Get a single user
    async getSingleUser(req, res) {
        try {

        } catch (error) {
            console.log('getSingleUser failed', error);
            return res.status(500).json(error);
        }
    },

    // Create a new user
    async createUser(req, res) {
        try {

        } catch (error) {
            console.log('createUser failed', error);
            return res.status(500).json(error);
        }
    },

    // Delete a  user
    async deleteUser(req, res) {
        try {

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
