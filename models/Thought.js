const { Schema, model } = require('mongoose');
const { ObjectId } = require('bson');
const dayjs = require('dayjs');

const reactionSchema = new Schema({
    reactionId: {
        type: ObjectId,
        default: new ObjectId,
    },
    reactionBody: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
        ref: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function (timestamp) {
            return dayjs(timestamp).format('M-D-YYYY [at] h:MM a');
        },
    },
});

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function (timestamp) {
            return dayjs(timestamp).format('M-D-YYYY [at] h:MM a');
        },
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    reactions: [reactionSchema],
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Initialize our Thought model
const User = model('thought', thoughtSchema);

module.exports = User;
