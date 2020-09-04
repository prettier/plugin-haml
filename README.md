<h1 align="center">Prettier for HAML</h1>

<p align="center">
  <a href="https://gitter.im/jlongster/prettier">
    <img alt="Gitter" src="https://img.shields.io/gitter/room/jlongster/prettier.svg?style=flat-square">
  </a>
  <a href="https://github.com/prettier/plugin-haml/actions">
    <img alt="GitHub Actions" src="https://img.shields.io/github/workflow/status/prettier/plugin-haml/Main?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/@prettier/plugin-haml">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@prettier/plugin-haml.svg?style=flat-square">
  </a>
  <a href="#badge">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
  </a>
  <a href="https://twitter.com/PrettierCode">
    <img alt="Follow+Prettier+on+Twitter" src="https://img.shields.io/twitter/follow/prettiercode.svg?label=follow+prettier&style=flat-square">
  </a>
</p>

`@prettier/plugin-haml` is a [prettier](https://prettier.io/) plugin for the HAML template language. `prettier` is an opinionated code formatter that supports multiple languages and integrates with most editors. The idea is to eliminate discussions of style in code review and allow developers to get back to thinking about code design instead.

## Getting started

To run `prettier` with the HAML plugin, you're going to need [`ruby`](https://www.ruby-lang.org/en/documentation/installation/) and [`node`](https://nodejs.org/en/download/) (version `8.3` or newer).

If you're using the `npm` CLI, then add the plugin by:

```bash
npm install --save-dev prettier @prettier/plugin-haml
```

Or if you're using `yarn`, then add the plugin by:

```bash
yarn add --dev prettier @prettier/plugin-haml
```

The `prettier` executable is now installed and ready for use:

```bash
./node_modules/.bin/prettier --write '**/*.haml'
```

## Configuration

Below are the options that `@prettier/plugin-haml` currently supports:

| API Option      | CLI Option         | Default | Description                                                                                         |
| --------------- | ------------------ | :-----: | --------------------------------------------------------------------------------------------------- |
| `printWidth`    | `--print-width`    |  `80`   | Same as in Prettier ([see prettier docs](https://prettier.io/docs/en/options.html#print-width)).    |
| `requirePragma` | `--require-pragma` | `false` | Same as in Prettier ([see prettier docs](https://prettier.io/docs/en/options.html#require-pragma)). |
| `tabWidth`      | `--tab-width`      |   `2`   | Same as in Prettier ([see prettier docs](https://prettier.io/docs/en/options.html#tab-width))       |

Any of these can be added to your existing [prettier configuration
file](https://prettier.io/docs/en/configuration.html). For example:

```json
{
  "printWidth": 120
}
```

Or, they can be passed to `prettier` as arguments:

```bash
prettier --print-width 120 --write '**/*.haml'
```

## Contributing

Check out our [contributing guide](CONTRIBUTING.md). Bug reports and pull requests are welcome on GitHub at https://github.com/prettier/plugin-haml.

## License

The package is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
