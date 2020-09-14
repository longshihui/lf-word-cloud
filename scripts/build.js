const rollup = require('rollup');

// see below for details on the options
const inputOptions = {
    input: './src/index.js'
};
const outputOptions = {
    file: './dist/lf-word-cloud.js',
    format: 'umd',
    name: 'LFWordCloud'
};

async function build() {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  // or write the bundle to disk
  await bundle.write(outputOptions);
}

build();