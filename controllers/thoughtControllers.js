const { User, Thought, Reaction } = require('../models');
const { rawListeners } = require('../models/Thought');

module.exports = {
//get all thoughts
async getThoughts(req, res) {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
},
//get single thought by id
async getSingleThought(req, res){
    try {
        const thoughts = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

        if(!thoughts) {
            return res.status(404).json({ message: 'no thoughts with that id found' });
        }
        res.json(thoughts);
    } catch(err) {
        res.status(500).json(err);   
     }
},
//create new thought 
async createThought(req, res) {
    try {
        const thoughts = await Thought.create(req.body);
        res.json(thoughts);
    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    } 
},
//update a thought by id
async updateThought(req, res) {
    try {
        const thoughts = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if(!thoughts) {
            return res.status(404).json({ message: "no thoughts with that id" });
        }
    
        res.json(thoughts);
    } catch(err) {
        res.status(500).json(err);
    }
},
//delete a thought by id
async deleteThought(req, res) {
    try {
        const thoughts = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if(!thoughts) {
            return res.status(404).json({ message: "no thought with that id" });
        }

        res.json({ message: 'thought deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},
//add a reaction to a thought
async addReaction(req, res) {
    try {
        const thought = await Thought.findById({ _id: req.params.thoughtId });
        
        if(!thought) {
            return res.status(404).json({ message: "no user with this id found" });
        }
    
        const updatedThought = await Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true, }
            );
            res.status(200).json(updatedThought);
    } catch (err) {
        res.status(500).json(err);
    }
},
// DELETE to remove a reaction from a thought 
async deleteReaction(req, res) {
    try {
        const thought = await Thought.findById({ _id: req.params.thoughtId }); 
       
        if(!thought) {
            return res.status(404).json({ message: "no user with that Id" });
        }
       
        await Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: {reactionId: req.params.reactionId}} },
            { new: true, }
        );
        res.json({ message: "reaction deleted" });
    } catch(err) {
        res.status(500).json(err);
    }
}
};
