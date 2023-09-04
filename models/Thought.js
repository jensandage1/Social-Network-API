const { Schema, model }=require('mongoose');
const { Reaction } = require('./Reaction.js');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1
        },
        createdAt: {
             type: Date,
             default: Date.now,
             //use getter method to format timestamp on query
        },
        username: {
            type: String,
            required: true
        },
        reactions: [Reaction],
            //array of nested documents created with reaction schema. 
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
)

//schema settings
//create a virtual called reactionCount that retrieves the length of the thoughts reactiion array field on query.
thoughtSchema.virtual('reactionCount')
.get(function(){
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;