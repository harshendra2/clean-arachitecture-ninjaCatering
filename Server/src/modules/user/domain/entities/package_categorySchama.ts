import mongoose, { Schema } from 'mongoose';

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        require: true,
      }
});

const PackageCategory = mongoose.model('PackageCategory', categorySchema);
export default PackageCategory;
