const mongoose = require('mongoose');

const user = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    userName: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: {type : String , required: true},
    // enrollmentNo: { type: String, required: true},
    bio: { type: String, default : ''},
    department: { type: String, required: true },
    graduationYear: Number,
    profileURL: {type: String },
    role: { type: String, enum: ["student", "professor", "alumni"], default: "student" },
    isVerified: { type: Boolean, default: false },

    //social connections
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    // Interest in feild
    tagsInterested: [String], 
    createdAt: { type: Date, default: Date.now },
   
});
module.exports = mongoose.model("User", user);