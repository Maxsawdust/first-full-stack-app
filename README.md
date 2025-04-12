# My First Full Stack App!

## Getting Started

In order to get this site up and running, you'll first need to make sure you're in the "carInventory" directory, and run

`npm run install-all`

This will install dependencies for carInventory, BACKEND, and FRONTEND.

---

You'll also need to navigate to /BACKEND/server.js and make sure that the mongoDB connection is correct. This can be done by adding a .env file with MONGO_URI inside of it. If you've got access to my cluster, you can connect to that, else you can just run it off of your local machine.

## Design choices

- I went for quite a modern, but industrial feel for this project, and tried to take my time in order to approach a few new css topics, like complex animations.

- Early on, I decided to useContext for my state management, and I think this worked well. Combined with custom hooks, I feel like I neatly packaged all the necessary global states.

- Form validation is done with formik and yup to make things nice and simple!

## Difficulties

- I spent quite some time researching backend tech like mongoDB and mongoose for this one, because I really wanted to understand what was going on.

- It took me a while to decide on how to cover updating more than one document at a time - as requested in the task brief, but eventually I decided on having the user filter by car make and model, and I'm quite happy with how that works.
