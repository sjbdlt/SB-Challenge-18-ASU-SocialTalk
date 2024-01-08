const { ObjectId } = require('mongoose').Types;
const { Thought, User, Reaction } = require('../models');


module.exports = {

  // create a new thought
  async createThought(req, res) {
    console.log(req.body.thoughtText);
    console.log(req.body.userName);
    // try {
      const thought = await Thought.create({thoughttext: req.body.thoughtText, username: req.body.userName});
      
      const user = await User.findOneAndUpdate(
        { userName: req.body.userName },
        { $addToSet: { thoughts: thought._id } },
        { runValidators: true, new: true }
      );
          
      if (!user) {
        return res.status(404).json({
          message: 'thought added, but no user found to associate thought too',
        });
      }
      
      res.json( {message: 'Thought successfully added'});
    //} catch (err) {
     // res.status(500).json(err);
    //}
  },

  // Get all thought
  async getThought(req, res) {
    try {
      const thought = await Thought.find();

      const thoughtObj = {
        thought,
      };

      res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },


  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' })
      }

      res.json({
        thought,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Delete a thought and remove thought from user
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No such thought exists' });
      }

      const user = await User.findOneAndUpdate(
        { username: req.body.userName },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'thought deleted, but no user thought found',
        });
      }

      res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // update a thought
  async updateThought(req, res) {
   
    try {
      const thought = await Thought.findByIdAndUpdate(
        { _id: req.params.thoughtId },
        { $set: { thoughttext: req.body.thoughtText } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create a new reaction
  async  createReaction(req, res) {
    try {

        const reactiondata = [{ reactionbody: req.body.reactionBody, username: req.body.userName }]

        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: reactiondata } },
          { runValidators: true, new: true }
        );
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }  
  },

  // Delete a reaction
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
}