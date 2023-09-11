const { User, Thought } = require('../models');

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
    //populate friend and thought data
    async getSingleUser(req, res) {
        try{
            const users = await User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('friends').populate('thoughts')
            

            if(!users) {
                return res.status(404).json({ message: "User not found" });
            }
            
            res.json({
                users, 
                // thoughts: await Thought(req.params.userId),
                // friends: await User(req.params.userId),
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
            await Thought.deleteMany({ _id: { $id: users.thoughts } });
            res.json({ message: "User and thoughts deleted." });
        }catch (err) {
            res.status(500).json(err);
        }
    },
    //update a user
    async updateUser(req, res) {
        try {
            const users = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if(!users) {
                return res.status(404).json({ message: "No users with this ID" });
            }
            res.json(users);
        } catch(err){
            res.status(500).json(err);
        }
    },


// /api/users/:userId/friends/:friendId

// POST to add a new friend to a user's friend list

async addFriend(req, res) {
    try {
        const users = await User.findById({ _id: req.params.userId });
        const friend = await User.findById({ _id: req.params.friendId });
        if(!users) {
            return res.status(404).json({ message: "no user with this id found" });
        }
        if(!friend) {
            return res.status(404).json({ message: "friend with this id not found" });
        }
        const updatedUser = await User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: friend._id }},
            { new: true, }
            );
            res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
},
// DELETE to remove a friend from a user's friend list
async deleteFriend(req, res) {
    try {
        const user = await User.findById({ _id: req.params.userId }); 
        const friend = await User.findById({ _id: req.params.friendId });
        if(!user) {
            return res.status(404).json({ message: "no user with that Id" });
        }
        if(!friend) {
            return res.status(404).json({ message: 'friend with that id not found' });
        }
        await User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: friend._id} },
            { new: true, }
        );
        res.json({ message: "friend deleted" });
    } catch(err) {
        res.status(500).json(err);
    }
}

};