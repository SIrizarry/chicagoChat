const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let chatLogs = new Schema({
    from:{
        type: String
    },
    text:{
        type: String
    },
    time :{
        type: String
    },
    room: {
        type: String
    }
},{
    collection: 'chatLogs'
}
);

module.exports = mongoose.model('chatLogs', chatLogs);