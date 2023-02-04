import { Schema, model } from 'mongoose';

const guildSchema = Schema({
    id: String,
    moderationLogsChannel: { 'type': String, 'default': '1070656965627355197' },
    memberLogsChannel: { 'type': String, 'default': '1070716070643650611' },
    guildLogsChannel: { 'type': String, 'default': '1070716374969753620' },
    channelLogsChannel: { 'type': String, 'default': '1070715958957723649' },
    messageLogsChannel: { 'type': String, 'default': '1070716482562052229' },
    threadLogsChannel: { 'type': String, 'default': '1070717201201512528' }

});

export default model('Guild', guildSchema);