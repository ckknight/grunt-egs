# grunt-egs

> Compile EGS packages to JavaScript.



## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-egs --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-egs');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4).*


## Egs task
_Run this task with the `grunt egs` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### linefeed
Type: `String`
Default: on Windows, `"\r\n"`, otherwise `"\n"`

Compilation will use this to join lines.

#### sourceMap
Type: `boolean`
Default: `false`

Compile JavaScript and create a .map file linking it to the GorillaScript source.

#### sourceRoot
Type: `string`
Default: `""`

Specify the `sourceRoot` property in the created .map file.

#### encoding
Type: `string`
Default: `grunt.file.defaultEncoding`, which is `"utf8"` unless overridden.

The encoding of the resultant .js files. Not recommended to change.

#### coverage
Type: `boolean` or `string`
Default: `false`

Instruments output .js files with instrumented coverage support. If `true`, then `'_$jscoverage'` will be the name of the coverage variable, but you can define your own.

#### export
Type: `string`
Default: `"EGSTemplates"`

Sets the global export when run in a browser rather than in node.js or with an AMD loader.


#### tokens
Type: `string` or `{ open: string, close: string, open-write: string, close-write: string, open-comment: string, close-comment: string }`
Default: `"<%" or { open: "<%", close: "%>", open-write: "<%=", close-write: "%>", open-comment: "<%--", close-comment: "--%>" }`

Sets the embed tokens to parse for template compilation.

If `"{{"` is provided, that works as `{ open: "", open-write: "{{", close-write: "}}", open-comment: "{#", close-comment: "#}" }`.
### Usage Examples

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


## Release History

 * 2013-06-05   v0.1.0   Initial release

---

Task submitted by [Cameron Kenneth Knight](http://github.com/ckknight)

*This file was generated on Wed Jun 05 2013 21:23:12.*
