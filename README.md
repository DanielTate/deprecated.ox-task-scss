# ox-task-scss

ox-task-scss is a task that compiles scss using node-sass under the hood.

Example:
```js
ox._add(scss)

ox.scss({
    log: true,
    watch: 'src/app.scss',
    options: [{
        input: 'src/app.scss',
        output: 'src/build/app.css',
        style: 'expanded',
        map: true
    }]
})
```