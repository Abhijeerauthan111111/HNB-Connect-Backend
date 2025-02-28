const mongoose = require('mongoose');

const post = new mongoose.Schema({
    content : {type:String, required: true},
    author : {type:mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    likes : [{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    comments: [{
        text: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now }
    }],
    tags : [{type:String}],
    mediaURL: [{type:String }],
    createdAt : {type:Date, default:Date.now},
    updatedAt : {type:Date, default:Date.now},

});

module.exports = mongoose.model("Post", post);


