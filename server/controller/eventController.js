const User = require("../models/User");
const Event = require("../models/Event");
const Ticket = require("../models/Ticket");
const stripe = require('stripe')('sk_test_51PDohfSC4n1uA83Pa2vlTKo5kG2t32HPSsWNDSnWp0gUHWzxxl2q5amTFRrC57SA90WK9zYyRcjTTppLZ8vIFdjZ00O6RYQ1qs');

const createEvent = async (req, res) => {
    try {
        // Check if all required fields are present in the request body
        const { title, description, date, location, category, posterPhoto, price } = req.body;
        if (!title || !description || !date || !location || !category || !posterPhoto) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        console.log(price);

        // Create and save the event
        const newEvent = new Event({
            title,
            description,
            date,
            location,
            organizer: req.user._id,
            category,
            poster: posterPhoto,
            price: price || 0
        });

        // Save the event to the database
        await newEvent.save();

        res.json({ msg: "Event created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};



const getEvents = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
        const limit = parseInt(req.query.limit) || 3; // Default to 3 items per page if not specified

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};

        // Count total number of events
        results.totalCount = await Event.countDocuments();

        if (endIndex < results.totalCount) {
            results.next = {
                page: page + 1,
                limit: limit
            };
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            };
        }

        // Fetch events with pagination
        results.events = await Event.find().limit(limit).skip(startIndex).exec();

        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const getEventById = async (req, res) => {
    try {
        const eventId = req.params.eventId; // Access event ID from URL params

        // Fetch the event by ID and populate only _id and name of the organizer
        const event = await Event.findById(eventId).populate({
            path: 'organizer',
            select: '_id username' // Specify the fields to include
        });

        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        res.json(event);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const getEventsBySearch = async (req, res) => {
    try {
        console.log(req.user);
        const keyword = req.query.search
            ? {
                $or: [
                    { title: { $regex: req.query.search, $options: "i" } },
                    { category: { $regex: req.query.search, $options: "i" } },
                ],
            }
            : {};

        // Select only the desired fields in the projection
        const events = await Event.find(keyword);
        res.send(events);
    } catch (error) {
        console.log('Error during user search:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const updateEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        console.log(eventId); // Access event ID from URL params
        const { title, description, date, location, category, posterPhoto, price } = req.body;

        // Check if the event ID is valid
        if (!eventId) {
            return res.status(400).json({ msg: "Event ID is required" });
        }

        // Find the event by ID
        const event = await Event.findById(eventId);

        // If event is not found, return 404 error
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // Update event fields
        event.title = title || event.title;
        event.description = description || event.description;
        event.date = date || event.date;
        event.location = location || event.location;
        event.category = category || event.category;
        event.poster = posterPhoto || event.poster;
        event.price = price || event.price;

        // Save the updated event to the database
        await event.save();

        res.json({ msg: "Event updated successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const eventDelete = async (req, res) => {
    try {
        const eventId = req.params.eventId; // Access event ID from URL params

        // Check if the event ID is valid
        if (!eventId) {
            return res.status(400).json({ msg: "Event ID is required" });
        }

        // Find the event by ID
        const event = await Event.findById(eventId);

        // If event is not found, return 404 error
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // Delete the event
        await Event.findByIdAndDelete(eventId);

        res.json({ msg: "Event deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const buyTicketPayment = async (req, res) => {
    try {

        const event = req.body

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: event.title
                        },
                        unit_amount: event.price * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:5173/event/ticket/payment-success/${event._id}`,
            cancel_url: `http://localhost:5173/event/ticket/payment-failed/${event._id}`,
        });

        // use demo card num : 4000003560000008

        res.json({ sessionId: session.id });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

const joinEvent = async (req, res) => {
    try {
        // Find the event by ID
        const event = await Event.findById(req.params.eventId);
        // console.log(req);

        // Check if the event exists
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // Check if the user is already in the attendees list
        if (event.attendees.includes(req.user._id)) {
            return res.status(400).json({ msg: 'User already joined the event' });
        }

        // Add the user ID to the attendees list
        event.attendees.push(req.user._id);

        // Save the updated event
        await event.save();

        res.json({ msg: 'Joined event successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const findUserEvents = async (req, res) => {
    try {
        const events = await Event.find({ attendees: req.user._id }).populate({
            path: 'organizer',
            select: '_id username'
        });

        res.json(events);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const findEventsUserOrganize = async (req, res) => {
    try {
        // Find events where the organizer's _id matches req.user._id
        const events = await Event.find({ 'organizer': req.user._id });

        // Check if any events were found
        if (events.length === 0) {
            return res.status(404).json({ message: 'No events found for the organizer' });
        }

        // Return the found events
        return res.status(200).json(events);
    } catch (error) {
        console.log('Error finding events:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    createEvent, getEvents, getEventById, getEventsBySearch, updateEvent, eventDelete, buyTicketPayment, joinEvent, findUserEvents, findEventsUserOrganize
};

