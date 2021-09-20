# ox-task-scss

ox-task-scss is a task that compiles scss using node-sass under the hood.

Example:
```js
ox._add(scss)

ox.scss({
    log: true,
    watch: './src/styles/**',
    options: {
        files: [{
            file: './src/styles/app.scss',
            outFile: './build/css/app.css',
            style: 'expanded',
            map: true
        }]
    }
})
```
