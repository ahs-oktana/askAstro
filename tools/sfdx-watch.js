// Ask Astro Webpack Plugin
"use strict";

// Load dependencies
const exec = require("child_process").exec;
const chokidar = require("chokidar");

// Watcher Constructor

function watch(dir) {
  console.log(`Watching ${dir}.`);
  chokidar
    .watch(dir, { ignored: /(^|[\/\\])\../, persistent: true })
    .on("change", (event, path) => {
      console.log(`${dir} changed.`);
      exec("sfdx force:source:push", (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }

        console.log(stdout);
        console.log(`Watching for new changes in ${dir}`);
      });
    });
}

module.exports = watch;
