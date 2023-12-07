const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IterationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Username of the person who registered the change
    dateCreated: { type: Date, default: Date.now, required: true }, // Date the iteration was made
    comment: { type: String, required: true }, // Iteration comment from the user
    newStatus: { type: String, required: true } // What the status has been changed to, or stays the same
});

IterationSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when the object is serialized
        delete ret.id;
    }
});

module.exports = mongoose.model('Iteration', IterationSchema);