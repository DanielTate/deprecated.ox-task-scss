const fs = require('fs')
const mkdirp = require('mkdirp')
const sass = require('sass')

module.exports = function scss(ox) {

    function getPath(path) {
        const namepath = path.split('/')
        const filename = namepath.pop()
        const filepath = [...process.cwd().split('/'), ...namepath].join('/')
        const fullpath = `${filepath}/${filename}`
        return {
            namepath,
            filename,
            filepath,
            fullpath,
        }
    }

    function compile(options) {
        const input = getPath(options.file)
        const output = getPath(options.outFile)

        if(!fs.existsSync(input.fullpath)) {
            ox._log(`${input.fullpath} didn't exist, it's being created it for you.`)
            mkdirp.sync(input.filepath)
            fs.writeFileSync(`${input.fullpath}`,'// Generated using ox-task-scss.')
        }

        if(!fs.existsSync(output.filepath)) {
            ox._log(`${output.filepath} didn't exist, it's being created for you.`)
            mkdirp.sync(output.filepath)
        }

        try {
            const result = sass.renderSync(options)
            fs.writeFileSync(`${output.fullpath}`, result.css)
            ox._log(`${output.filename} compiled.`)
			if(options.callback) options.callback(this)
        } catch(e) {
            ox._log(e.formatted || e.message)
        }
    }

    function hydrate(options = {}, defaults) {
        for(const [key, value] of Object.entries(defaults)) {
            if(options[key] === undefined) {
                options[key] = value
            } 
        }
        return options
    }

    const defaults = {
        files: [{
            file: 'src/app.scss',
            indentWidth: '4',
            omitSourceMapUrl: 'true',
            outFile: 'build/app.css',
            sourceMapContents: true,
            sourceMapEmbed: true,
            sourceMap: true,
			callback: false
        }]
    }

    const options = hydrate(ox.options, defaults)

    options.files.forEach(compile)
}
