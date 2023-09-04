const { Schema, model } = require('mongoose');
const { Thought } = require('./Thought');

const userSchema = new Schema (
    {
        username: {
            type: String, 
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            //valied email
            match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        },
        thoughts: [Thought],
        friends: [User]
            //array of _id values referencing user model (self-reference.)
    }
)

//schema settings
//create a virtual called friendCount that retrieves the length of users "friens" array field on query
userSchema.virtual('friendCount')
.get(function (){
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;