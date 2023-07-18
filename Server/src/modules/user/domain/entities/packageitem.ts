import mongoose, { Schema } from 'mongoose';

const packageSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    desserts:{
        type:String,
        required:true
    },
    mains:{
        type:String,
        required:true,
    },
    starters:{
        type:String,
       required:true
    },
    img:{
        type:String,
    },
     category:{
         type: mongoose.Schema.Types.ObjectId,
         ref:'PackageCategory',
         required:true
     },
     minOrder:{
        type:Number,
        default:0
     }

});

const packageitem = mongoose.model('packageitem', packageSchema);
export default packageitem;