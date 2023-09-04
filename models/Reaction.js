const { Schema } = require('mongoose');

const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
)

//schema settings - this will not be a model bu used as the reaction fields subdocument schema in the thoguht model. 
module.exports = reactionSchema;