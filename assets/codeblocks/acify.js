window.log;
(function() {

  var config = {

    classes: {
      ace: 'deck-ace',
      aceresult: 'ace-result',
      buttons: 'ace-buttons'
    },

    selectors: {
      aceitem: '.code',
    },

    data : {
      acified: 'true'
    },

    options : {
      editor: {
        mode : "ace/mode/javascript",
        theme : "ace/theme/dawn",
        wrap: true,
        tabSize : 2,
        softTabs : true,
        lineNumbers : true,
        editable: true
      },

      module: {
        buttons : "run,clear",
        runnable : false
      }
    },

    globals : "Miso,_,$"
  };

  var CodeBlock = function(options) {
    options = options || {};

    this.el = $(options.el);
    this.editorEl = $('<div>').insertAfter(this.el);
    this.el.hide();
    this.editor = null;
    this.output = null;

    this.buildContent();
    this.init(options);

  };

  /**
  * Initialize options
  */
  CodeBlock.prototype.init = function(options) {

    this.options = $.extend({}, config.options.editor, config.options.module, {
      mode     : !!this.el.attr('mode') ? this.el.attr('mode') : config.options.editor.mode,
      theme    : !!this.el.attr('theme') ? this.el.attr('theme') : config.options.editor.theme,
      buttons  : !!this.el.attr('buttons') ? this.el.attr('buttons') : config.options.module.buttons,
      readOnly : this.el.attr("runnable") === "false" ? true : false,
      sandbox  : this.el.attr("sandbox") === "false" ? false : true,
      autorun  : !!this.el.attr("autorun") ? this.el.attr("autorun") : false,
      editable    : !!this.el.attr('editable') ? this.el.attr('editable') : config.options.editor.editable,
      onFocus : function(e) {
        inEditor = true;
      },
      onBlur : function(e) {
        inEditor = false;
      }
    });

    this.acify();

    // are we showing the console?
    if (options.readOnly) {
      this.options.showConsole = false;
    } else {
      // build runnable source.
      this.buildSource();
      if (this.el.attr("showConsole") !== "false") {
        this.options.showConsole = true;
      } else {
        this.options.showConsole = false;
      }
    }

    // grab all callbacks.
    this.callbacks = {};
    if (!!this.el.attr("callbacks-clear")) {
      this.callbacks.clear = this.el.attr("callbacks-clear");
    }
    if (!!this.el.attr("callbacks-reset")) {
      this.callbacks.reset = this.el.attr("callbacks-reset");
    }
    if (!!this.el.attr("callbacks-run")) {
      this.callbacks.run = this.el.attr("callbacks-run");
    }

    // split buttons
    this.options.buttons = this.options.buttons.split(",");

    // make buttons and their callbacks
    this.eventify();

    // if auto run, run the code
    if (this.options.autorun) {
      if (this.options.sandbox) {
        this.runSandbox();
      } else {
        this.runLocal();
      }
    }
  };

  /**
  * Adjust internal text content to have correct indentation
  */
  CodeBlock.prototype.buildContent = function() {
    var lines = this.el.text().split("\n"),
        indent = Infinity,
        regex = /^(\s+)(.*)/;

    // scan through the text and remove the min amount of spaces
    // so that the indentation is properly done.
    $.each(lines, function(j, line) {

      // find amount of space in the beginning of each line and store the
      // smallest space we find as the indent.
      var space = regex.exec(line);
      if (space) {
        space = space[1];
        indent = Math.min(indent, space.length);
      } else {
        indent = 0;
      }
    });

    // now that we found the smallest indent, reassemble the lines
    var newblock = $.map(lines, function(line) {
      return line.slice(indent);
    }).join('\n');
    this.el.text($.trim(newblock));
  };

  /**
  * Turn block into a ace editor
  */
  CodeBlock.prototype.acify = function() {
    var text = this.el.text();
    var lineCount = text.split('\n').length;
    var lineHeight;

    // make editor
    this.editorEl.text(text);
    this.editor = ace.edit(this.editorEl[0]);

    // set options
    this.editor.setTheme(this.options.theme);
    this.editor.getSession().setMode(this.options.mode);
    this.editor.getSession().setTabSize(this.options.tabSize);
    this.editor.getSession().setUseWrapMode(true);
    this.editor.setReadOnly(!this.options.editable);

    // mark this block as having been acified
    $.data(this.el[0], 'acified', 'true');
    lineHeight = this.editor.renderer.lineHeight;

    this.editorEl.css({
      height: lineHeight * lineCount
    });
    this.editor.resize();
  };

  /**
  * Returns true if the block has been acified.
  */
  CodeBlock.prototype.isAcified = function() {
    return ($(this.el[0]).data('acified') === 'true');
  };

  CodeBlock.prototype.eventify = function() {
    var wrapper = this.el[0],
        buttonContainer = $('<div>', {
          "class" : config.classes.buttons
        }).prependTo($(wrapper).parent()),
        buttons = {};

    // are we showing console?
    if (this.options.showConsole) {
      this.output = $('<div>', {
        "class" : config.classes.aceresult
      }).appendTo($(wrapper).parent());
    }

    // do we have any buttons?
    if (this.options.buttons.length > 0) {

      // run button
      if (this.options.buttons.indexOf("run") > -1) {
        var runButton  = $('<div>', {
          "class" : "button",
          text : "Run"
        }).appendTo(buttonContainer);

        // what scope are we running in?
        if (this.options.sandbox) {
          runButton.click($.proxy(this.runSandbox, this));
        } else {
          runButton.click($.proxy(this.runLocal, this));
        }
      }

      // clear button
      if (this.options.buttons.indexOf("clear") > -1) {
        var clearButton = $('<div>', {
          "class" : "button clear",
          text : "Clear",
        }).appendTo(buttonContainer).click($.proxy(this.clear, this));
      }

      // reset button
      if (this.options.buttons.indexOf("reset") > -1) {
        var resetButton = $('<div>', {
          "class" : "button reset",
          text : "Reset"
        }).appendTo(buttonContainer)
          .click($.proxy(this.reset, this));
      }
    }
  };

  /**
  * Clear output.
  */
  CodeBlock.prototype.clear = function() {
    if (this.output !== null) {
      this.output.html("");
    }

    // do we have any callbacks? if so, call those.
    if (this.callbacks.clear) {
      eval(this.callbacks.clear);
    }

  };

  /**
  * Reset to original content
  */
  CodeBlock.prototype.reset = function() {
    this.editor.setValue(this.originalBody);
    this.editor.clearSelection();
    this.editor.moveCursorTo(0,0);
    if (this.callbacks.reset) {
      eval(this.callbacks.reset);
    }
  };

  /**
  * Run in local scope
  */
  CodeBlock.prototype.runLocal = function() {

    var runWithCustomConsole;
    this.clear();

    if (this.output) {
      window.output = this.output[0];
    }

    this.buildSource();

    console.log(this.source);
    if (this.options.showConsole) {
      runWithCustomConsole = new Function(
        "var console = { log: arguments[0] };" + this.source
      );
      runWithCustomConsole(CodeBlock.__makeConsoleFunction(this.output));
    } else {
      eval.call(window, this.source);
    }
  };

  /**
  * Run in sandbox
  *  save the default logging behavior.
  *  Following Dean Edward's fantastic sandbox code:
  *  http://dean.edwards.name/weblog/2006/11/sandbox/+evaluating+js+in+an+iframe
  */
  CodeBlock.prototype.runSandbox = function() {

    this.clear();

    // create an iframe sandbox for this element.
    var iframe = $("<iframe>")
      .css("display", "none")
      .appendTo($('body'));

    // make console overwrite
    if (this.options.showConsole) {
      window.oldlog = console.log;
      console.log = CodeBlock.__makeConsoleFunction(this.output);
    }

    window.output = this.output[0];

    // find globals
    this.globals = [];
    if (this.el.attr("globals")) {
      this.globals = this.el.attr("globals");
    } else {
      this.globals = config.globals;
    }
    this.globals = this.globals.split(",");

    $.each(this.globals, function(prop, val) {
      val = $.trim(val);
      iframe[0].contentWindow[val] = window[val];
    });

    var sandBoxMarkup = "<script>"+
      "var MSIE/*@cc_on =1@*/;"+ // sniff
      "console={ log: parent.console.log };";

    $.each(this.globals, function(prop, val) {
      val = $.trim(val);
      iframe[0].contentWindow[val] = window[val];
      sandBoxMarkup += "val=parent." + val +";";
    });

    sandBoxMarkup += "parent.sandbox=MSIE?this:{eval:function(s){return eval(s)}};log=parent.log;<\/script>";

    // write a script into the <iframe> and create the sandbox
    frames[frames.length - 1].document.write(sandBoxMarkup);
    this.buildSource();
    sandbox.eval(this.source);

    // get rid of the frame. New Frame for every context.
    iframe.remove();

    console.log = window.oldlog;

  };

  CodeBlock.prototype.buildSource = function(original) {

    original = original || false;
    var hiddenScripts = [], cleanupScripts = [];

    this.source = "";

    // Seek out and cache all setup script
    if (this.el.attr("id")) {
      $("script[type=\"codemirror/setup\"][data-selector=" + this.el.attr("id") + "]").each(function() {
        hiddenScripts.push({
          selector: $(this).data("selector"),
          src: this.innerHTML
        });
      });

      // Prepend all setup scripts
      $.each(hiddenScripts, $.proxy(function(i, script) {
        this.source += script.src + "\n";
      }, this));
    }

    // append actual editor body.
    if (typeof this.originalBody === "undefined") {
      this.originalBody = this.editor.getValue();
    }

    if (original) {
      this.source += this.originalBody;
    } else {
      this.source += this.editor.getValue();
    }


    // Seek out and cache all cleanup scripts
    if (this.el.attr("id")) {
      $("script[type=\"codemirror/cleanup\"][data-selector=" + this.el.attr("id") + "]").each(function() {
        cleanupScripts.push({
          selector: $(this).data("selector"),
          src: this.innerHTML
        });
      });

      // Append all cleanup scripts
      $.each(cleanupScripts, $.proxy(function(i, script) {
        this.source += script.src + "\n";
      }, this));


    }

  };

  CodeBlock.__makeConsoleFunction = function(output) {
    return function() {
       messages = [];
      // Convert all arguments to Strings (Objects will be JSONified).
      for (var i = 0; i < arguments.length; i++) {
        var value = arguments[i];
        messages.push(typeof(value) == 'object' ? JSON.stringify(value) : String(value));
      }
      var msg = messages.join(" ");
      if (output.html() !== "") {
        output.append("<br />" + msg);
      } else {
        output.text(msg);
      }
    };
  };


  var acify = function(selector) {
    container = $(selector);

    // If no container provided, exit.
    if (_.isUndefined(container)) {
      throw new Error("provide container!");
    }

    // find all code blocks within the container.
    var codeblockElements = container.find(config.selectors.aceitem),
        codeBlocks = [];

    $.each(codeblockElements, function(i, codeblock) {
      codeBlocks.push(new CodeBlock({ el : codeblock }));
    });

    window.__def.resolve();
  };

  window.__def = _.Deferred();
  acify(".codeblock");
}());