<a id="ancora"></a>
# <center>  Challenge 3 ➖ Week 12 ➖ Users and Events API </p> </center>
<img src="https://scontent.fmgf7-1.fna.fbcdn.net/v/t39.30808-6/218315480_4439975822707551_1762521070984772137_n.png?_nc_cat=104&ccb=1-7&_nc_sid=783fdb&_nc_ohc=f3ilfCoVyGgAX89TCSo&_nc_ht=scontent.fmgf7-1.fna&oh=00_AfBPxehxKRF84vQk4Eo36eRVmyL5TYYn9gAzZsxe3XzPJA&oe=659B1447" alt="Compass Uol" width=900 height=380>

<a id="ancora0"></a>
<a name="Table of Content"></a>
## 🗂️ Table of contents
1. [About the project](#ancora1)
2. [Technologies](#ancora2)
3. [Features](#ancora3)
4. [How to run the project](#ancora4)
5. [API EndPoints](#ancora5)
6. [Authors](#ancora6)

<a id="ancora1"></a>
## 🔎 About the project
Welcome to my project! This is my second challenge in Compass UOL! In this project i built a robust application that serves as a REST API for managing users and events information, integrating with external services.

<a id="ancora2"></a>
## 🛠️Technologies

<font size="15"> <p align="center"> These are the technologies we have used in this project: <h1>
</p>  </font> <br />

<div align="center">

  <table>
    <tr>
      <th>Package</th>
      <th>Version</th>
    </tr>
    <tr>
      <td>@joi/date</td>
      <td>^2.1.0</td>
    </tr>
    <tr>
      <td>@types/express</td>
      <td>^4.17.21</td>
    </tr>
    <tr>
      <td>@types/joi</td>
      <td>^17.2.3</td>
    </tr>
    <tr>
      <td>@types/node</td>
      <td>^20.10.5</td>
    </tr>
    <tr>
      <td>bcryptjs</td>
      <td>^2.4.3</td>
    </tr>
    <tr>
      <td>dotenv</td>
      <td>^16.3.1</td>
    </tr>
    <tr>
      <td>express</td>
      <td>^4.18.2</td>
    </tr>
    <tr>
      <td>express-async-errors</td>
      <td>^3.1.1</td>
    </tr>
    <tr>
      <td>http-status-codes</td>
      <td>^2.3.0</td>
    </tr>
    <tr>
      <td>joi</td>
      <td>^17.11.0</td>
    </tr>
    <tr>
      <td>jsonwebtoken</td>
      <td>^9.0.2</td>
    </tr>
    <tr>
      <td>mongoose</td>
      <td>^8.0.3</td>
    </tr>
    <tr>
      <td>supertest</td>
      <td>^6.3.3</td>
    </tr>
    <tr>
      <td>mongodb-memory-server</td>
      <td>^9.1.3</td>
    </tr>
  </table>

</div>


<a id="ancora3"></a>
## ✨ Features

These are some of the main features supported by our API:
 * Users can make sign-up and sign-in.

 * Users can list the events previously created. Either by listing all of them or searching by ID.

 * If it's necessary, it's also possible to delete a event. Either by id or by query params.

### [⬆️ Go back to the table of content](#ancora0)
---

<a id="ancora4"></a>
## 🚀 Let's get started!

These are the steps to you to copy and run the project in your local machine:

   ## 1️⃣ Clone this repository:
    git clone https://github.com/SenhorAfonso/users-and-events-api.git

   ## 2️⃣ Install the dependencies:
    npm install


   ## 3️⃣ Change the server settings
   - The first step is to change the name ``` .env.example ``` file, to ```.env```
   - Now, edit the file by changing the variables.
   - If you prefer, You can also use your localhost database! 😉

   ## 4️⃣ Now, convert your TypeScript files to JavaScript:
    tsc -w

   ## 5️⃣ To run the project:
    npm run start

   ## 6️⃣ To run the test suite:
    npm run test

### [⬆️ Go back to the table of content](#ancora0)
---

<a id="ancora5"></a>
## 🔴 API EndPoints

💡 An API endpoint is a specific location within an API that accepts requests and sends back responses. These are the endpoints of this API:
 

## Users endpoints

POST: `/api/v1/users/sign-up`. ➡️ To sign-up a new user. <br>
🚚 endpoint payload:
```
firstName: "string",
lastName: "string",
birthDate: "YYYY-MM-DD",
city: "string",
country: "string",
email: "example@gmail.com",
password: "string",
confirmPassword: "string"
```

***All the fields are required***.

---

POST: `/api/v1/users/sign-in`. ➡️ To sign-in a user. <br>
🚚 endpoint payload:
```
email: "example@gmail.com",
password: "string"
```

***All the fields are required***

---
## Events endpoints
🔒All this routes needs the user to be logged-in.

POST: `/api/v1/events/`. ➡️ To create a new event. <br>
🚚 endpoint payload:
```
description: "string",
dayOfWeek: "string"
```

***The dayOfWeek field are required***. <br>

***dayOfWeek property must be one of the following:*** sunday, monday, tuesday, wednesday, thursday, friday, saturday.

---
GET: `/api/v1/events/:id`. ➡️ To retrieve a single event by id. <br>

GET: `/api/v1/events/` ➡️ To retrieve an array of events based in the query params. <br>
🚚 endpoint payload:
```
description: "string",
dayOfWeek: "string",
page: number,
limit: number,
sort: number
```
---
DELETE: `/api/v1/events/:id` ➡️ To delete a single event. 

DELETE: `/api/v1/events/` ➡️ To delete a set of events and retrive the deleted ones. <br>
⚠️ If the payload is empty, all the events is going to be deleted.
🚚 endpoint payload:
```
description: "string",
dayOfWeek: "string"
```
---

### [⬆️ Go back to the table of content](#ancora0)
---

<a id="ancora6"></a>
## 👨‍💻 Authors

- [Pedro Afonso](https://github.com/SenhorAfonso)


---
### [⬆️ Go back to the top](#ancora)
