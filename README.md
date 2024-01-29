# Anime Watchlist

Welcome to Anime Watchlist, a MERN (MongoDB, Express, React, Node.js) stack project that allows users to create accounts, log in, and manage their anime watchlists. Explore and add your favorite animes with ease! This project is currently hosted at https://animerec-vv3i.onrender.com/ . Please note that the backend service is inconsistent due to onrenders' free tier plan so logining in might not work automatically.

## Description

Anime Watchlist is a web application designed to simplify the process of managing your anime watchlist. Users can create accounts, log in, and search for animes to add to their personalized watchlists. The application provides an overview of each anime series, making it convenient for users to track their progress and discover new titles.

## Features:

User account creation and authentication
Seamless search functionality for anime series
Easy addition of animes to personalized watchlists
Detailed information view for each anime
Reference: MongoDB, Express, React, Node.js

Visuals

## Installation

To run Anime Watchlist locally, follow these steps:

Clone the repository.

Replace all api fetches with https://localhost:5000 or whatever endpoint your backend will be.

Navigate to the project directory.

Install dependencies using the package manager ( npm install).
Run Frontend (npm start)
Set up the MongoDB database.
Navigate to backend folder and Run the server (nodemon server).
Access the application in your web browser.
Requirements:

Node.js
MongoDB

#### MongoDB structure

The MongoDB structure utlized is: Two collections, Anime and Users.

Reference data model was utilized instead of the traditional embeded data model due to a couple of factors: scalability, query optimzition, query readablility. Especially since future plans of anime user statistics (how many people have added an anime to a watchlist), will be implemented eventually leading to the decision of a reference model.

### Usage

Create an account or log in.
Search for your favorite anime series.
Add animes to your watchlist.
Explore detailed information for each anime.
Support
For help or inquiries, please open an issue on the issue tracker.

## Roadmap

Implement user profile customization.
Integrate social sharing features for anime recommendations.
Contributing
We welcome contributions! If you'd like to contribute to Anime Watchlist, please follow our contribution guidelines.

Authors and Acknowledgment
A special thanks to all contributors who have helped improve Anime Watchlist.

### Authors:

Rafael Martinez
License
This project is licensed under the MIT License.

## Project Status

Development is ongoing, with plans for continuous improvement. Feel free to contribute or provide feedback. If you are interested in becoming a maintainer, please reach out.

Note: Development pace may vary based on availability.

Enjoy managing your anime watchlist with Anime Watchlist! 🎉
