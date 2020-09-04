# Contributing

Thanks so much for your interest in contributing! This page provides background on how prettier and this plugin work, links for understanding each step that prettier executes, various helpful utilities for analyzing the tree structures being manipulated, and frequently asked questions.

Armed with the knowledge below, we would love to see your contribution! Please open an issue or a pull request at https://github.com/prettier/plugin-haml.

- [How it works](#how-it-works)
  - [Text to AST](#text-to-ast)
  - [AST to Doc](#ast-to-doc)
  - [Doc to text](#doc-to-text)
- [Useful links](#useful-links)
- [Useful commands](#useful-commands)
- [Testing](#testing)

## How it works

In order to get printed, the code goes through a couple of transformations. The first is taking the entire file as text and parsing it into an abstract syntax tree (AST). The second is taking the AST and transforming it into prettier's intermediate representation, internally referred to as Docs. The final is taking the Doc nodes and converting them back into plain text, taking into account printing rules like max line length. Each of those steps is details below.

### Text to AST

When the prettier process first spins up, it examines which files it's going to print and selects an appropriate plugin for each one. Once selected, it runs that plugin's `parse` function, seen [here](src/parser.js). For the case of the HAML plugin, that entails spawning a Ruby process that runs [parser.rb](src/parser.rb) with the input code preloaded on stdin.

`parser.rb` will read the text off of stdin and then feed it to a new `Haml::Parser` instance, which is a standard Ruby implementation of HAML. That parser will return an AST of node objects.

Now that the text has been transformed into an AST that we can work with, `parser.rb` will serialize the result to JSON, write it back to stdout, and exit. The `parse` function will then parse that JSON by reading off the child process once it has exited, and return that value back to prettier.

### AST to Doc

Once prettier has a working AST, it will take it and call the selected plugin's [`print` function](src/printer.js), whose purpose is to convert that AST into prettier's intermediate representation called Docs. It does this by handing the print function a `FastPath` object that keeps track of the state of the printing as it goes, and allows accessing various parts of the AST quickly.

Effectively, it walks the AST in the reverse direction from the way `Haml::Parser` built it (top-down instead of bottom-up). The first node that gets passed into the `print` function is the `root` node as that's always on top. Then it is the `root` node's responsibility to recursively call print on its child nodes as it best sees fit.

As the nodes are printing themselves and their children, they're additionally building up a second AST. That AST is built using the `builder` commands from prettier core, described [here](https://github.com/prettier/prettier/blob/master/commands.md).

Once every node has been printed, the `print` node returns the intermediate representation to `prettier`.

### Doc to text

At this point, this is where `prettier`'s printer takes over. Because the remainder of the process is language-agnostic and `prettier` knows how to handle its own `Doc` representation, the Ruby plugin no longer has a job to do. `prettier` will walk its own `Doc` nodes and print them out according to the rules established by the structure.

## Useful links

For further understanding, below is a list of helpful resources.

- [Prettier plugin documentation](https://prettier.io/docs/en/plugins.html) - documentation around `prettier`'s plugin system
- [Builder commands](https://github.com/prettier/prettier/blob/master/commands.md) - the functions used to build the `prettier` IR
- [Writing a Prettier plugin](https://medium.com/@fvictorio/how-to-write-a-plugin-for-prettier-a0d98c845e70) - a nice tutorial on how to build a `prettier` plugin

## Useful commands

While developing, we've built a couple of small utilities for debugging the `prettier` printing process. To use them, first run `yarn` and `bundle` to install dependencies.

- `bin/doc [file|source]` - outputs the Doc nodes represented by the source
- `bin/parse [file|source]` - outputs the AST that Haml builds before it gets passed back to `prettier`
- `bin/print [file|source]` - outputs the printed source of a Ruby file after running it through `prettier`

## Testing

To run the tests (with `jest`) that test the formatting against preconfigured fixtures to protect against regressions, run:

```
$ yarn test
```
