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
            input: './src/styles/app.scss',
            output: './build/css/app.css',
            style: 'expanded',
            map: true
        }]
    }
})
```