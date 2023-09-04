const { User, Thought, Reaction } = require('../models');

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
        const thoughts = await Though.findOne({ _id: req.params.thoughtId })
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
    //(push created thoughts id to associated users thoughts array field)
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
async deleteCouse(req, res) {
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
}


// /api/thoughts/:thoughtId/reactions

// POST to create a reaction stored in a single thought's reactions array field

// DELETE to pull and remove a reaction by the reaction's reactionId value
