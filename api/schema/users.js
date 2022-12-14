const mongoose = require("mongoose");
console.log('user')
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required:true
        }
    }
);
const userDB = mongoose.model("User", userSchema);
module.exports = userDB;