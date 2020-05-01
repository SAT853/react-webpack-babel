## Quick Start
```
# Install dependencies
npm install

# Serve on localhost:3000
npm start

# Build for production
npm run build
```

## Set up React App with Webpack, Webpack Dev Server and Babel from scratch.

## Step 1: Create package.json file

```
mkdir projectname
cd ~/projectname
// creates package.json file
npm init --y
```

## Step 2: Install react and react-dom

```
npm i react react-dom
```
## Step 3: Install Babel

Let's install babel and the required presets and plugins.

```
npm i -D @babel/preset-react @babel/preset-env @babel/core babel-loader
```

@babel/preset-react is preset for react,
@babel/preset-env is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms are needed by your target environment(s).
@babel/core contains the core functionality of Babel.
babel-loader will be used by webpack to transpile Modern JS into the JS code that browsers can understand.

## Step 4: Create a babel config file .babelrc

Here we tell babel to use @babel/preset-env target the last few versions of browsers and support for them. This will ensure that when the browser is updated it will stop transpiling of the old browser version and will transpile for the new one.
We also tell webpack to use @babel/preset-react for React

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

## Step 5: Install Webpack and Webpack Dev Server

```
npm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin
```

## Step 6: Create directories and files for the project

Create directories called src and public .Create our HTML file public/index.html , entry filesrc/index.js and a component file src/App.js inside of it.

```
mkdir src public
touch src/index.js src/App.js public/index.html
```

## Step 7: Set up Webpack configuration file webpack.config.js

Here html-webpack-plugin will use your custom index.html that will be rendered by webpack-dev-server

Please note that if you don’t pass any param in new HTMLWebpackPlugin() , then thehtml-webpack-plugin plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags.

Also add the style loader, css loader and file-loader for styles and images. As webpack understands javascript so we need to convert the styles and images in javascript using these loaders

```
npm install style-loader css-loader file-loader
```

```
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./public/index.js",
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "index_bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|j?g|svg|gif)?$/,
        exclude: /node_modules/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
```

## Step 7: Create a React Component src/App.js

```
import React from "react";
import "./App.css";
import Test from "./Components/Test";
const App = () => {
  return (
    <div>
      <h1>React Test App</h1>
      <Test />
    </div>
  );
};

export default App;
```

## Step 8: Create a div#root inside public/index.html

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Raect App</title>
  </head>
  <body>
    <div id="App"></div>
  </body>
</html>
```

## Step 9: Insert App.js component into the DOM - // public/index.js

Now let's insert the App.js component into div with the id root that exists public/index.html file

```
import React from "react";
import ReactDom from "react-dom";
import App from "../src/App";

ReactDom.render(<App />, document.getElementById("App"));

```

## Step 10: Add scripts in the package.json

```json
  "scripts": {
    "start": "webpack-dev-server --open",
    "build": "webpack --mode=production"
  }

```

Now run the webpack dev server.

```
npm start
```
