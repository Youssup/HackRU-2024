const express = require("express");
const axios = require('axios');

const { requireUser } = require('../middleware/authorization');

const router = express.Router();

router.post('/locationcalc', async (request, response, next) => {
    const address1 = request.body.address1; // origin
    const address2 = request.body.address2; // destination

    try {
        var origin = await geocode('origin', address1);
        var destination = await geocode('destination', address2);

        var distanceAndTime = calculateDistanceAndTime(origin[1].lat, origin[1].lng, destination[1].lat, destination[1].lng);

        response.send(distanceAndTime);
    } catch (error) {
        // Handle error
        response.status(500).send('Error processing request');
    }
})

async function geocode(type, addressInput) {
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: addressInput,
                key: process.env.GOOGLE_GEOCODE_API_KEY,
            }
        });

        if (response.data.results.length === 0) {
            throw new Error('No results found for the provided address.');
        }

        const formattedAddress = response.data.results[0].formatted_address;
        const geometry = response.data.results[0].geometry.location;

        return [formattedAddress, geometry];
    } catch (error) {
        console.error('Error fetching geocode:', error);
        throw error;
    }
}

function calculateDistanceAndTime(originLat, originLng, destinationLat, destinationLng) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(destinationLat - originLat);
    var dLng = deg2rad(destinationLng - originLng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(originLat)) * Math.cos(deg2rad(destinationLat)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c * 0.62137; // Distance in miles

    // Adjusting for error
    if (distance < 5) {
        var distanceWithError = distance * 1.50;
        var estimatedTimeWithError = ((distanceWithError / 37.2823) * 60) * 1.50; // Time in minutes
    }

    if (distance < 1000 && distance > 5) {
        var distanceWithError = distance * 1.35;
        var estimatedTimeWithError = ((distanceWithError / 37.2823) * 60) * 1.15; 
    }

    if (distance > 1000) {
        var distanceWithError = distance * 1.20;
        var estimatedTimeWithError = ((distanceWithError / 37.2823) * 60) * 1.05; 
    }

    return [distanceWithError.toFixed(2), estimatedTimeWithError.toFixed(2)]; // time in minutes?
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

module.exports = router;