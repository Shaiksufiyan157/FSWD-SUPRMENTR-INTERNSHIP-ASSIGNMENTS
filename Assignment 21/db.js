const mongoose = require('mongoose');

// Connect to MongoDB (replace with your connection string if remote)
mongoose.connect('mongodb://localhost:27017/crudLabDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Connection error:', err));

// 1. Define Schema and Model
const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: Number,
    inStock: { type: Boolean, default: true }
});
const Item = mongoose.model('Item', itemSchema);

async function runCRUD() {
    try {
        // CREATE
        const newItem = new Item({ name: 'Mechanical Keyboard', price: 120 });
        const savedItem = await newItem.save();
        console.log('Created:', savedItem);

        // READ (All)
        const allItems = await Item.find();
        console.log('Read All:', allItems);

        // UPDATE (Find by ID and Update)
        const updatedItem = await Item.findByIdAndUpdate(
            savedItem._id, 
            { price: 100 }, 
            { new: true } // Returns the updated document
        );
        console.log('Updated:', updatedItem);

        // DELETE
        const deletedItem = await Item.findByIdAndDelete(savedItem._id);
        console.log('Deleted:', deletedItem.name);

    } catch (error) {
        console.error('CRUD Error:', error);
    } finally {
        mongoose.connection.close(); // Close connection when done
    }
}

runCRUD();