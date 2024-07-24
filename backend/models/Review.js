const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    breweryId: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
  username : {
    type:String,
    require:true
}
});

module.exports = mongoose.model('Review', ReviewSchema);

