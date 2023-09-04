const { User, Thought, Reaction } = require('../models');

module.exports = {
    //get all users
    async getUsers(req, res){
        try {
            const users = await User.find();
            res.json(users);
        } catch(err){
            res.status(500).json(err);
        }
    },
    //get single user
    //needs to populate friend and thought data
    async getSingleUser(req, res) {
        try{
            const users = await User.findOne({ _id: req.params.userId })
            .select('-__v');

            if(!users) {
                return res.status(404).json({ message: "User not found" });
            }
            
            res.json({
                users, 
                // thoughts: await thoughts(req.params.userId),
                // friends: await friends(req.params.userId),
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //create a user
    async createNewUser(req, res) {
        try {
            const users = await User.create(req.body);
            res.json(users);
        } catch(err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    //delete a user
    async deleteUser(req, res) {
        try {
            const users = await User.findOneAndDelete({ _id: req.params.userId });
            if(!users) {
                return res.status(404).json({ message: "No user with that ID" });
            }
            await User.deleteMany({ _id: { $id: users.thoughts } });
            res.json({ message: "User and thoughts deleted." });
        }catch (err) {
            res.status(500).json(err);
        }
    },
    //update a user
    async updateUser(req, res) {
        try {
            const users = await User.findOneAndUpdate(
                { _id: req.params.courseId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if(!users) {
                return res.status(404).json({ message: "No users with this ID" });
            }
            res.json(course);
        } catch(err){
            res.status(500).json(err);
        }
    },
};

// /api/users/:userId/friends/:friendId

// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list

