## An OOP Based Project-Management Back-end App. Server => Nodejs - Expressjs

#### Welcome to the OOP based Project Management Repository!

- Requirements:
    - MongoDB Installed
    - Nodejs Installed

Easily Clone the project and Read, or customize for your projects :).

1. First do a ``` npm i``` To Install dependencies.
2. Start the Project With command ```npm start```
3. then go to requests folder placed in http folder at app, and send a request to ```http://localhost:8000/auth/register``` and fill the data there with your own Ideas. And your account will be automatically registered.
*tip*: You have to install rest Client extension so that you can use this kind of files.

4. Add a ```.env``` File to the root of your application with the following options:
```env
   JWT_SECRET_KEY={your Key => can be anything}
```

5. then make a request to ```http://localhost:8000/auth/login``` and put your username and password given in the register part. Go to mongo Db and Copy your token.

then update ```.env``` file in the following way:

```env 
    JWT_SECRET_KEY=YourKeyHere
    token='Bearer CopiedToken'
```

*tip*: Your token is valid for 30 days, and after that you have to login again and copy the new token and replace it in the ```.env``` file.

Hope you Enjoy!