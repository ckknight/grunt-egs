# Options

## linefeed
Type: `String`
Default: on Windows, `"\r\n"`, otherwise `"\n"`

Compilation will use this to join lines.

## sourceMap
Type: `boolean`
Default: `false`

Compile JavaScript and create a .map file linking it to the GorillaScript source.

## sourceRoot
Type: `string`
Default: `""`

Specify the `sourceRoot` property in the created .map file.

## encoding
Type: `string`
Default: `grunt.file.defaultEncoding`, which is `"utf8"` unless overridden.

The encoding of the resultant .js files. Not recommended to change.

## coverage
Type: `boolean` or `string`
Default: `false`

Instruments output .js files with instrumented coverage support. If `true`, then `'_$jscoverage'` will be the name of the coverage variable, but you can define your own.

## export
Type: `string`
Default: `"EGSTemplates"`

Sets the global export when run in a browser rather than in node.js or with an AMD loader.


## tokens
Type: `string` or `{ open: string, close: string, openWrite: string, closeWrite: string, openComment: string, closeComment: string, openLiteral: string, closeLiteral: string }`
Default: `"<%" or { open: "<%", close: "%>", openWrite: "<%=", closeWrite: "%>", openComment: "<%--", closeComment: "--%>", openLiteral: "<%@", closeLiteral: "@%>" }`

Sets the embed tokens to parse for template compilation.

If `"{{"` is provided, that works as `{ open: "{%", close: "%}", openWrite: "{{", closeWrite: "}}", openComment: "{#", closeComment: "#}", openLiteral: "{@", closeLiteral: "@}" }`.

## includeRuntime
Type: `boolean`
Default: `false`

Include the full egs-runtime.js file into the package. This will allow you to only ship a single file.
