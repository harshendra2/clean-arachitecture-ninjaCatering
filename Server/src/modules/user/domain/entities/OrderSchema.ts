import mongoose, { Schema} from 'mongoose';
const { ObjectId } = Schema.Types;

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      product: [
        {
          id: { type: ObjectId },
          name: { type: String },
          price: { type: Number },
          quantity: { type: Number },
          foodType: { type: String },
          Nonveg: { type: String },
          img: { type: String },
        },
      ],
      date: {
        type: Date,
      },
      time: {
        type: String,
      },
      veguest: {
        type: Number,
      },
      Nonvegguest: {
        type: Number,
      },
      status: {
        type: String,
        required: true,
        default: "processing",
      },
      address: {
        type: String,
      },
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
      subtotal: {
        type: Number,
      },
      orderId: {
        type: String,
      },
});

const order = mongoose.model('order', orderSchema);
export default order;