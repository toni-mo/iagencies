const mongoose = require('mongoose');

const agencySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    address: String,
    website: String
});

module.exports = mongoose.model('Agency', agencySchema);