# This is a guide on how to run Synergy on your local machine.

## Overview

This project is a React application that uses the Azure Static Web Apps (SWA) CLI API simulator for local development and testing. This guide will help you set up the development environment by installing the necessary npm dependencies and the SWA CLI.

## Prerequisites

- Node.js (version 16.x or later)
- git (version)
-----------------------------------------------------------------------

## Getting Started

Follow these steps to set up your development environment:
_____________________________________________________________________________________
### 1. Clone the Repository

- Open a terminal and clone the repository to the local machine:

git clone https://github.com/Mondo3771/SD.git

- Navigate into the SD folder

cd SD 

_____________________________________________________________________________________
### 2. Install dependencies

- In the terminal run the following command

npm install

- This will download the dependencies you will need to run the application.

_____________________________________________________________________________________
### 3. Install the SWA CLI

- To install the SWA CLI globally, run in your terminal:

npm install -g @azure/static-web-apps-cli

- The SWA CLI (Azure Static Web Apps CLI) allows you to run the Static Web Apps locally and emulate the behavior of the Azure environment.

_____________________________________________________________________________________
### 4. Change your package file

- Without closing the terminal, open your file exlporer and navigate to the SD folder and open the package.json file in a text editor.
- Go to line 47 and change ` "build": "CI=False react-scripts build" ` to ` "build": "CI=False react-scripts build" `
- Without changing this THE APPLICATION WILL NOT RUN.

_____________________________________________________________________________________
### 5. Build the application

- In the terminal run:

npm run build

- This command creates an optimized production build of the React application on http://localhost:4280.
_____________________________________________________________________________________
### 6. Start the SWA CLI

- In you terminal run:

swa start build --api-location api

- This command will start the SWA CLI and serve the API from the api directory.

_____________________________________________________________________________________
### 7. Open the application

- On your browser navigate to http://localhost:4280 and the application will be open.






 