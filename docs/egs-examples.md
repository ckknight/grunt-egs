# Usage Examples

```js
gorilla: {
  compile: {
    files: {
      'path/to/views.js': 'path/to/views',
    }
  },
  
  compileWithMaps: {
    options: {
      sourceMap: true,
      sourceRoot: "path/to" // defaults to ""
    },
    files: {
      'path/to/views.js': 'path/to/views',
    }
  }
}
```
