const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (value) {
                    // Regular expression for email validation
                    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                    return emailRegex.test(value);
                },
                message: 'Please enter a valid email address',
            },
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought',
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user',
        }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema
    .virtual('friendCount')
    // Getter
    .get(function () {
        return this.friends.length;
    });

// Initialize User model
const User = model('user', userSchema);

module.exports = User;
