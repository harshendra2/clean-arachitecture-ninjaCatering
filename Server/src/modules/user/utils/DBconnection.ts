import mongoose from 'mongoose';

const connectDb=()=>{
    
    const connection="mongodb+srv://harshendra:Narayana20Ha@cluster0.misnwgb.mongodb.net/CaterNinja"
    mongoose.connect(connection)
}

export default connectDb;