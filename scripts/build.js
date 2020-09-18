const rollup = require("rollup");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require('rollup-plugin-commonjs');
const json = require('@rollup/plugin-json');

// see below for details on the options
const inputOptions = {
  input: "./src/index.js",
  plugins: [
    resolve(),
    commonjs({
      include: /node_modules/,
    }),
    json()
  ],
};
const outputOptions = {
  file: "./dist/lf-word-cloud.js",
  format: "umd",
  name: "LFWordCloud",
};

async function build() {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  // or write the bundle to disk
  await bundle.write(outputOptions);
}

build();
