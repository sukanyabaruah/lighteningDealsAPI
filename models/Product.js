const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide product name'],
      maxlength: [100, 'Name can not be more than 100 characters'],
    },
    actualprice: {
      type: Number,
      required: [true, 'Please provide product actual price'],
      default: 0,
    },
    finalprice: {
      type: Number,
      required: [true, 'Please provide product final price'],
      default: 0,
    },
    totalunits: {
      type: Number,
      required: [true, 'Please provide total units'],
      default: 0,
    },
    availableunits: {
      type: Number,
      required: [true, 'Please provide available units'],
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  }

);

// ProductSchema.index({ createdAt: 1 }, { expireAfterSeconds: 0 });
module.exports = mongoose.model('Product', ProductSchema);
