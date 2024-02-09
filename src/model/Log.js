const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    action: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' } // Assuming you have a User model
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;