"use strict";

const path = require("path");
const watch = require("./tools/sfdx-watch.js");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const fs = require("fs");

module.exports = function(env) {
  // Checks to see if running in astro mode
  const envFlag = env || false;
  const sfdx = envFlag ? envFlag.sfdx || false : false;

  // Setup an exports object.
  // Changes made to this object will run with webpack everytime.
  let exportsObject = {
    entry: {
      staticresources: "./redux/index.js"
    },

    output: {
      path: path.join(
        __dirname,
        "src",
        "staticresources"
      ),
      filename: "askAstro.resource",
      library: "askAstro",
      libraryTarget: "umd",
      umdNamedDefine: true
    },

    module: {
      loaders: [
        {
          test: /.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test:/\.scss$/,
          loader: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader?url=false", "resolve-url-loader", "sass-loader?sourceMap"]
          }) //the resolve-url loader is important
        },
        {
          test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
          loader: "url-loader?limit=100000"
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin("astroStyles.css"),
      new class RenamePlugin {
        //rename the styles file to .resource after it has been extracted.
        //purify doesn't, by default, look at .resource files and if i tell it to look them
        //it gets confused by the javascript file
        apply(compiler) {
          compiler.plugin("done", function() {
            fs.rename(
              path.join(__dirname, "src", "staticresources", "astroStyles.css"),
              path.join(__dirname, "src", "staticresources", "astroStyles.resource")
            );
            fs.rename(
              path.join(__dirname, "src", "staticresources", "a48c5c6d31119800605ef0de228e4631.png"),
              path.join(__dirname, "src", "staticresources", "astroPNG.resource")
            );
          });
        }
      }()
    ]

  };
  if (sfdx) {
    watch("ask-astro");
  }

  return exportsObject;
};
