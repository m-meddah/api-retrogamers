# API RetroGamers

Here you will find the API I made during the "apothéose" at [O'clock](https://oclock.io/) to become a web developper.  
I made this after 5 months of instensive learning JavaScript, and I took the "API & Data" specialization.

That application run with an Express server in NodeJS.  
The database is a PostgreSQL database.  
I made it with `Sqitch`, that helps you to versionize your database.  
And all the input made by user are validate by `Joi`.  
I also made a documentation with `JSDoc Swagger` to test all the routes of the application.

## What is Retrogamers API?

Retrogramers is a web application who will help you to create your retrogaming's collection.  
You will find 43 systems in our database, consoles and portable consoles from the '70 to the begining of the '2000.  
You will find a list of 32453 games, and the details of 32285 of them.

## Install dependencies

```shell
npm install
```

That command will install all the dependencies you need to run the API from the file `package.json`

## Create the `.env` file

You will find a file named `.env.example` where you will find all the data you need to run the API

## Create the `sqitch.conf` file

You will find a file named `sqitch.conf.example` where you will find all the data you need to create the database.

## Create the database

Create the database as you do usually

## Run the server

```shell
npm run dev
```

That command will launch the application on [`http://localhost:3080/api`](http://localhost:3080/api).

You can also see the documentation made with JSDoc Swagger on [`http://localhost:3080/api-docs`](http://localhost:3080/api-docs).  

You will find a file named `test.http` to try the application, but you will need to download `REST Client` on Visual Studio Code to try the routes.

That API is the MVP of the Retrogamers Project.  
It will grow as soon as possible.
  
## Thanks to Screenscraper

I would like to thanks the Screenscraper team who authorized me to take some data from their database to make my project.  
Thank you guys.
