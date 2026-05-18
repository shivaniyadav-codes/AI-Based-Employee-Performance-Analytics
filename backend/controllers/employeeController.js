const Employee = require('../models/Employee');

const addEmployee = async (req, res) => {
    try {
        const { name, email, department, skills, performanceScore, experience } = req.body;

        if (performanceScore === undefined || performanceScore === null) {
            return res.status(400).json({ message: 'Validation error: Missing performance score' });
        }

        const employeeExists = await Employee.findOne({ email });
        if (employeeExists) {
            return res.status(400).json({ message: 'Error message: Duplicate email' });
        }

        const employee = await Employee.create({
            name, email, department, skills, performanceScore, experience
        });

        res.status(201).json({ message: 'Employee stored successfully', employee });
    } catch (error) {
        res.status(400).json({ message: 'Validation error', error: error.message });
    }
};

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const searchEmployees = async (req, res) => {
    try {
        const { department } = req.query;
        if (!department) {
            return res.status(400).json({ message: 'Department query parameter is required' });
        }

        const employees = await Employee.find({ 
            department: { $regex: new RegExp(department, 'i') } 
        });
        
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee updated successfully', employee });
    } catch (error) {
        res.status(400).json({ message: 'Update failed', error: error.message });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Delete failed', error: error.message });
    }
};

module.exports = { addEmployee, getEmployees, searchEmployees, updateEmployee, deleteEmployee };
