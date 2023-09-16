const { ObjectId } = require('mongoose').Types;
const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');

const reactionSchema = new Schema({
    reactionBody: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function (timestamp) {
            return dayjs(timestamp).format('M-D-YYYY [at] h:MM a');
        },
    },
}
);

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
        type: String,
        required: true,
    },
    userId: {
        type: ObjectId,
        required: true,
        ref: 'user',
    },
    reactions: [reactionSchema],
},
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// Create a virtual called reactionCount that retrieves the length of the thoughts's reactions array field on query.
thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return this.reactions.length;
    });

// Initialize Thought model
const Thought = model('thought', thoughtSchema);

module.exports = { Thought };
