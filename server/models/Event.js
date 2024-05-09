const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    poster: { type: String, required: true },
    price: { type: Number, default: 0 },
    attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }] // Track users who join the event
});

module.exports = mongoose.model('Event', eventSchema);
