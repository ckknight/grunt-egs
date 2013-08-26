/*!
 * grunt-gorilla
 * https://github.com/ckknight/grunt-gorilla
 *
 * Copyright (c) 2013 Cameron Kenneth Knight
 * Licensed under the MIT license.
 */

require! path
require! fs
require! egs

module.exports := #(grunt)
  grunt.register-multi-task "egs", "Compile EGS packages into JavaScript.", #!
    let options = @options {
      -bare
      source-map: null
      grunt.util.linefeed
      encoding: grunt.file.default-encoding
      -coverage
      export: "EGSTemplates"
      include-runtime: false
    }
    
    grunt.verbose.writeflags options, "Options"

    let verbose = grunt.option('verbose') or options.verbose
    
    let done = @async()
    
    let promise = promise!
      for file in @files
        let start-time = Date.now()
        
        if file.src.length != 1
          throw "Must provide a single directory"
        let source-directory = file.src[0]
        let stat = try
          yield to-promise! fs.stat source-directory
        catch e
          throw "Unable to open $(source-directory): $(String e)"
        if not stat.is-directory()
          throw "Must provide a directory, '$(source-directory)' is not."

        let dest = @files[0].dest
        
        let compile-options = {
          options.encoding
          options.linefeed
          options.bare
          options.coverage
          source-map: if options.source-map
            {
              file: "$dest.map"
              source-root: options.source-root or ""
            }
          else
            null
          global-export: options.export
          include-egs-runtime: options.include-runtime
        }
        if is-string! options.tokens
          switch options.tokens
          case '{{'
            compile-options.open := "{%"
            compile-options.close := "%}"
            compile-options.open-write := "{{"
            compile-options.close-write := "}}"
            compile-options.open-comment := "{#"
            compile-options.close-comment := "#}"
            compile-options.open-literal := "{@"
            compile-options.close-literal := "@}"
          case '<%'
            void
          default
            throw "Unexpected tokens option: '$(options.tokens)'"
        else if is-object! options.tokens
          compile-options.open := options.tokens.open
          compile-options.close := options.tokens.close
          compile-options.open-write := options.tokens.open-write
          compile-options.close-write := options.tokens.close-write
          compile-options.open-comment := options.tokens.open-comment
          compile-options.close-comment := options.tokens.close-comment
          compile-options.open-literal := options.tokens.open-literal
          compile-options.close-literal := options.tokens.close-literal
      
        grunt.log.write "Compiling $(path.basename source-directory) ..."
        let start-time = Date.now()
        yield egs.compile-package source-directory, dest, compile-options
        grunt.log.writeln " $(((Date.now() - start-time) / 1000_ms).to-fixed(3)) s"
    promise.then(
      #-> done()
      #(e)
        if is-string! e
          grunt.log.error e
        else
          grunt.log.error "Got an unexpected exception: $(String(e?.stack or e))"
        done(false))
