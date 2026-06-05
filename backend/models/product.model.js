import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, {
    timestamps: true //createdAt and updatedAt fields will be automatically added to the schema
});

const Product = mongoose.model('Product', productSchema);
// this tells mongoose to create a collection called 'products' 
// in the database and use the productSchema to define the structure of the documents in that collection
//mongoose will end up taking the name of the model and pluralizing it to create the collection name. 
// So in this case, the collection will be called 'products' and it will use the productSchema to define the structure of the documents in that collection.
export default Product;
