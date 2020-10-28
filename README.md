# 🚀 reflask
A simple demo app combining React + webpack and Flask.

The application consists of a single page which continually takes a photo through the users camera every second, before sending it to the backend for classification with the ResNet50 model in Keras. The results are not always correct (though often amusing), but the application is meant to serve as a simple example of combining Flask with React and webpack.

## Requirements

* Node.js
* Python 64-bit version between 3.5.x and 3.8.x.

The specific python version requirements is due to the use of [TensorFlow](https://www.tensorflow.org/install).

## Getting started

To setup the environment and required dependencies for both frontend and backend, run the following commands.
``` 
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
npm install
```
This will create a virtual environment for our python backend, and install the flask framework + all the required frontend dependencies defined in requirements.txt.

Then, go ahead and start the project by running the following commands in their own separate terminal windows:

*(Make sure you have activated the virtual environent in the terminal before starting the backend)*

```
npm run start:api
npm start
```

The app should now be accessible on http://localhost:5000.

Everything in the app is served from Flask, both in development and production mode. However, in order to enable hot reloading in the frontend during development, an instance of webpack-dev-server is running under the hood. By employing a reverse proxy, we direct any requests for static files to the webpack-dev-server during development.

## Running in production mode

When running the app in production mode Flask will function as a regular web server, serving the static html and javascript files to the client.
For the sake of simplicity, there is a command to build a webpack bundle in production mode and then start the API in production mode.

*NOTE: Be sure to have your virtual environment activated when running the below command.*

```
npm run start:prod
```

## Tech stack

The application makes use of the following libraries.

**Backend (Python)**
- Flask
- TensorFlow / Keras
- python-livereload

**Frontend (JavaScript)**
- React
- webpack
- webpack-dev-server
