# FireEnjin Backend

This is a back-end development stack that uses Firebase and GraphQL with the magic of TypeScript.

# How to Install

1. git clone https://github.com/MadnessLabs/fireenjin-backend
2. npm install
3. Download Service Account JSON from Firebase Project Settings and put it as service-account.json in the root. (See GIF below.)
   ![LT6RvC27Qp](https://user-images.githubusercontent.com/4184680/66259522-8fba8180-e777-11e9-8e37-a7034c06ebd9.gif)

# How to Play

## build

Delete the dist folder and run TypeScript compiler to build project.

## build:firebase

Delete the dist folder, run TypeScript compiler, and generate Firebase Functions index with RESTful API.

## clean

Delete the dist folder.

## codegen

Generate typings and StencilJS components from models and queries.

## env

Copy files from env folder and overwrite specific files per environment.

## deploy:graphql

Deploy your GraphQL instance to Google Cloud.

## deploy:firebase

Deploy your triggers (Cloud Functions) to Firebase.

## lint

Run linting on TypeScript files.

## migrate

Run migrations that haven't already ran from src/migrations folder.

## release

Build a release of the backend, typings, and Stencil components.

## seed

Deploy seeds from src/seeds to firestore collections.

## seed:clone

Copy down data from firestore collections to src/seeds.

## serve

Serve the project via a local web server and watch for changes to reload.

## start

This is a alias for the serve command

## test

This will run tests via jest.

## test:watch

This will run a watcher on all your tests
