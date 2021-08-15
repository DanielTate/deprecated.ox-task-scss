const fs = require('fs')
const ox = require('@oxidental/ox')
const scss = require('../index.js')

beforeAll(() => {
    if(fs.existsSync('./src')) {
        fs.rmdirSync('./src', { recursive: true });
    }
    if(fs.existsSync('./build')) {
        fs.rmdirSync('./build', { recursive: true });
    }
})

test('Creates a scss input & output with no config', () => {
    ox._add(scss)
    ox.scss()
})
