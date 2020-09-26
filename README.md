# 🚀 reflask
A simple demo app combining React + webpack and Flask.

At its current state, the project serves a React frontend through Flask, while also communicating with a backend api to get the current time from the server every second.

## Getting started

To setup the environment and required dependencies for both frontend and backend, run the following commands.
```
python3 -m venv venv
source venv/bin/activate
pip install flask
npm install
```
This will setup a virtual environment for our python backend, and install the flask framework + all the required frontend dependencies.

Then, start the project by running the following commands in their own separate terminal windows:
```
yarn start:api
yarn start
```


The app should now be accessible on http://localhost:5000