const Customer = require('../model/customer');

// Save a new customer
const saveCustomer = async (req, res) => {
    try {
        const lastCustomer = await Customer.findOne({}, {}, { sort: { id: -1 } });
        let newId = "C001";

        if (lastCustomer) {
            const lastIdNum = parseInt(lastCustomer.id.slice(1), 10);
            const nextIdNum = lastIdNum + 1;
            newId = `C${nextIdNum.toString().padStart(3, '0')}`;
        }

        const newCustomer = new Customer({
            id: newId,
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
        });

        await newCustomer.save();
        res.status(200).json({ message: `${newId} Customer saved successfully.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all customers
const getCustomer = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json({ customers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a customer by ID
const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from URL params
        const { name, email, contact } = req.body;

        // Check if customer exists before updating
        const customer = await Customer.findOne({ id });
        if (!customer) {
            return res.status(404).json({ message: `Customer with ID ${id} not found.` });
        }

        const updatedCustomer = await Customer.updateOne(
            { id: id },
            { $set: { name, email, contact } }
        );

        res.json({ message: `${id} Customer updated successfully.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a customer by ID
const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from URL params

        // Check if customer exists before deleting
        const customer = await Customer.findOne({ id });
        if (!customer) {
            return res.status(404).json({ message: `Customer with ID ${id} not found.` });
        }

        await Customer.deleteOne({ id: id });
        res.json({ message: `${id} Customer deleted successfully.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getCustomer,
    saveCustomer,
    updateCustomer,
    deleteCustomer
};
