const fs = require('fs')
const ox = require('@oxidental/ox')
const scss = require('../index.js')

function cleanup() {
    if(fs.existsSync('./src')) {
        fs.rmdirSync('./src', { recursive: true });
    }
    if(fs.existsSync('./build')) {
        fs.rmdirSync('./build', { recursive: true });
    }
}

beforeAll(() => {
    cleanup()
})
afterAll(() => {
    cleanup()
})

test('Creates a scss input & output with no config', () => {
    ox._add(scss)
    ox.scss()
})
