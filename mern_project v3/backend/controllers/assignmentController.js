const Assignment = require('../models/assignmentModel');

//get all assignments for logged in user
const getAssignments = async (req, res) => {
	  try {
		    const user_id = req.user._id;
		    const assignments = await Assignment.find({user_id}).sort({createdAt: -1});
		    res.status(200).json(assignments);
	  } catch (error) {
		    res.status(500).json({error: error.message});
	  }
};

//create assignment
const createAssignment = async (req, res) => {
	  const {title, status, dueDate} = req.body;
	  try {
		    const user_id = req.user._id;
		    const assignment = await Assignment.create({title, status, dueDate, user_id});
		    res.status(201).json(assignment);
	  } catch (error) {
		    res.status(400).json({error: error.message});
	  }
};

//delete assignment
const deleteAssignment = async (req, res) => {
	  const {id} = req.params;
	  try {
		    const assignment = await Assignment.findOneAndDelete({_id: id, user_id: req.user._id});
		    if (!assignment) {
			      return res.status(404).json({error: 'Assignment not found'});
		    }
		    res.status(200).json(assignment);
	  } catch (error) {
		    res.status(400).json({error: error.message});
	  }
};

//update assignment
const updateAssignment = async (req, res) => {
  	const {id} = req.params;
	  const {title, status, dueDate} = req.body;
  	try {
	    	const assignment = await Assignment.findOneAndUpdate(
			      {_id: id, user_id: req.user._id},
			      {title, status, dueDate},
			      {new: true}
		    );
		    if (!assignment) {
			      return res.status(404).json({error: 'Assignment not found'});
		    }
		    res.status(200).json(assignment);
	  } catch (error) {
		    res.status(400).json({error: error.message});
	  }
};

module.exports = {
	  getAssignments,
  	createAssignment,
  	deleteAssignment,
  	updateAssignment
};