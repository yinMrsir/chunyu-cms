const { compile } = require('nexe');

console.log('Compiling binaries...');
compile({
  input: 'ncc_build/index.js',
  output: `nexe_build/nest_server.exe`,
  resources: ['ncc_build/**/*'],
  targets: ['windows-x64-12.18.2'],
})
  .then(() => {
    console.log('Finished compiling binaries');
  })
  .catch((error) => {
    console.error(error);
  });
