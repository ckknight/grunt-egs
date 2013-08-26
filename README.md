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
Type: `string` or `{ open: string, close: string, openWrite: string, closeWrite: string, openComment: string, closeComment: string, openLiteral: string, closeLiteral: string }`
Default: `"<%" or { open: "<%", close: "%>", openWrite: "<%=", closeWrite: "%>", openComment: "<%--", closeComment: "--%>", openLiteral: "<%@", closeLiteral: "@%>" }`

Sets the embed tokens to parse for template compilation.

If `"{{"` is provided, that works as `{ open: "", openWrite: "{{", closeWrite: "}}", openComment: "{#", closeComment: "#}", openLiteral: "{@", closeLiteral: "@}" }`.

#### includeRuntime
Type: `boolean`
Default: `false`

Include the full egs-runtime.js file into the package. This will allow you to only ship a single file.

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

 * 2013-08-26   v0.1.2   Add the "includeRuntime" option.
 * 2013-06-06   v0.1.1   Add the "openLiteral" and "closeLiteral" to the "tokens" option.
 * 2013-06-05   v0.1.0   Initial release

---

Task submitted by [Cameron Kenneth Knight](http://github.com/ckknight)

*This file was generated on Mon Aug 26 2013 01:33:32.*
