const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const SCSS = require('node-sass')

module.exports = function scss(ox) {

    const defaults = {
        files: [{
            input: './src/app.scss',
            output: './build/app.css',
            style: 'expanded',
            map: true
        }]
    }

    let options = ox.options || {}

    // Assign defaults if they don't exist
    for(const [key, value] of Object.entries(defaults)) {
        if(options[key] === undefined) {
            options[key] = value
        } 
    }

    options.files.forEach(compile)

    function compile(options) {
        const compiled  = options.output.split('/').pop()
        const output = path.dirname(options.output)
        const dest = `${output}/${compiled}`
        const exists = fs.existsSync(output)
        let result = null

        if(!fs.existsSync(options.input)) {
            ox._log(`${options.input} didn't exist, we are creating it for you.`)
            const inputPath = path.dirname(options.input)
            const filename = options.input.split('/').pop()
            mkdirp.sync(inputPath)
            fs.writeFileSync(`${inputPath}/${filename}`,'Generated using ox-task-scss.')
        }

        if(!exists) {
            ox._log(`${output} didn't exist, creating it for you.`)
            mkdirp.sync(output)
        }

        try {
            result = SCSS.renderSync({
                file: options.input,
                dest,
                outputStyle: options.style || 'compressed',
                sourceMap: options.map || true,
                sourceMapContents: options.map || true,
                sourcemapEmbed: options.map || true
            })
        } catch (e) {
            ox._log(e.formatted)
        }

        try {
            fs.writeFileSync(`${output}/${compiled}`, result.css)
            ox._log(`${compiled} compiled.`, 1)
        } catch(e) {
            ox._log(e.formatted)
        }
    }
}
