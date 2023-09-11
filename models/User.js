const { Schema, model } = require('mongoose');

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
            //valid email
            match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: "user"
        }]

    },
    {
        toJSON: {
            getters: true,
        },
    }
);

//schema settings

userSchema.virtual('friendCount')
.get(function (){
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;