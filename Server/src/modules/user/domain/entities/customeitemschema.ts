import mongoose, { Schema } from 'mongoose';

const CustomeItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    img:{
        type:String,
    },
    Nonveg:{
        type:String,
        required:true
    },
    count:{
     type:String,
     required:true
    },
    foodType:{
        type:String,
        required:true
       },
     category:{
         type: mongoose.Schema.Types.ObjectId,
         ref:'CustomeCategory',
         required:true
     }
});

const CustomeItem= mongoose.model('customeitem', CustomeItemSchema);
export default CustomeItem;