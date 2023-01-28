const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    id: String,
    logChannel: { 'type': String, 'default': '1068560374711980032' },
});

module.exports = mongoose.model('Guild', guildSchema);