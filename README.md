# List Management Application

This project is a React-based list management application bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It allows users to manage items between multiple lists, fetch data from an API, and dynamically create new lists.

## Live Demo

Access the live application here: [List Management Application](https://saimohan4444.github.io/)

---

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run deploy`

Deploys the production build to GitHub Pages, making it accessible online.\
This script uses the `gh-pages` package for deployment.

### `npm run eject`

**Note: This is a one-way operation. Once you `eject`, you can't go back!**\
Ejecting copies all the configuration files and dependencies (like Webpack, Babel, and ESLint) into your project for full control. Use this only if necessary.

---

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

---

## Project Features

1. **Dynamic List Management**:
   - View items in two default lists (`List 1` and `List 2`).
   - Create new lists dynamically by selecting items from existing lists.

2. **Item Movement**:
   - Move items between existing lists.
   - Add items to a newly created list.

3. **Data Fetching**:
   - Fetch list data from an API using the `fetchLists` service.
   - Display loading indicators during data fetching and handle errors gracefully.

4. **Deployment**:
   - Deployed to GitHub Pages for easy access.

---

## Example API Response

The application fetches initial list data from an API. Below is an example of the API response structure:

```json
{
  "lists": [
    { "id": 1, "name": "Item 1", "description": "Description 1", "list_number": 1 },
    { "id": 2, "name": "Item 2", "description": "Description 2", "list_number": 2 }
  ]
}
