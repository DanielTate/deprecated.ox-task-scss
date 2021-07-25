const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const SCSS = require('node-sass')

module.exports = function scss(args) {
    const options = args.options
    Array.isArray(options) ? options.forEach(compile) : compile(options)

    function compile(options) {
        const compiled  = options.output.split('/').pop()
        const output = path.dirname(options.output)
        const dest = `${output}/${compiled}`
        const exists = fs.existsSync(output)
        let result = null

        if(!exists) {
            args._log(`${output} didn't exist, creating it for you.`)
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
            args._log(e.formatted)
        }

        try {
            fs.writeFileSync(`${output}/${compiled}`, result.css)
            args._log(`${compiled} compiled.`, 1)
        } catch(e) {
            args._log(e.formatted)
        }
    }
}
