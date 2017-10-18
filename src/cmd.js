const setup = require('./setup')
const cargo = require('./cargo')

const HELP_STR = `wargo automatically configures the emscripten compiler environment for your cargo command,
on any linux or mac os computer.

Usage:
    wargo <cargo subcommand> [<args>...]

Some special commands are:
    build   runs 'cargo build --target=wasm32... <args>'
    test    builds the test binary into WebAssembly, and then runs it using selenium
    setup   just installs emcc without building anything`

module.exports = function(argv) {
  let subcommand = argv[0]
  if (subcommand === undefined) {
      console.warn(HELP_STR)
      process.exit(0)
  }

  setup()
  switch (subcommand) {
    case 'setup':
      process.exit(0)
    case 'test':
      // todo
    case 'build':
      // todo
    default:
      cargo(argv)
  }

  process.exit(0)

  var client = require('webdriverio').remote({
      user: process.env.SAUCE_USERNAME,
      key: process.env.SAUCE_ACCESS_KEY,
      host: 'localhost',
      port: 4445,
      desiredCapabilities: {
          browserName: 'chrome'
      }
  });

  client
      .init()
      .url('http://www.meow.com')
      .getTitle().then(function(title) {
          console.log('Title was: ' + title);
      })
      .end();
}