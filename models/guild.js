import { Schema, model } from 'mongoose';

const guildSchema = Schema({
    id: String,
    logChannel: { 'type': String, 'default': '1068560374711980032' },
});

export default model('Guild', guildSchema);