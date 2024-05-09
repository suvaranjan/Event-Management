const express = require('express');
const router = express.Router();
const eventController = require('./../controller/eventController');
const middleware = require('../middleware/middleware');

router.post('/create-event', middleware, eventController.createEvent);
router.get('/all-events', eventController.getEvents);
router.get('/single-event/:eventId', eventController.getEventById);
router.get('/search-events', eventController.getEventsBySearch);
router.put('/update-event/:eventId', middleware, eventController.updateEvent);
router.delete('/delete-event/:eventId', middleware, eventController.eventDelete);
router.post('/buy-ticket/create-checkout-session', middleware, eventController.buyTicketPayment);
router.get('/join/:eventId', middleware, eventController.joinEvent);
router.get('/user-joined-events', middleware, eventController.findUserEvents);
router.get('/user-organized-events', middleware, eventController.findEventsUserOrganize);
// router.get('/buy-ticket/payment-success/:eventId', eventController.handlePaymentSuccess);

module.exports = router;