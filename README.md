# curcurbit

[![cucurbit version](https://img.shields.io/npm/v/cucurbit.svg?longCache=true&style=for-the-badge)](https://www.npmjs.com/package/cucurbit)
[![cucurbit license](https://img.shields.io/github/license/plouc/cucurbit.svg?longCache=true&style=for-the-badge)](https://github.com/plouc/cucurbit/blob/master/LICENSE)
[![cucurbit issues](https://img.shields.io/github/issues/plouc/cucurbit.svg?longCache=true&style=for-the-badge)](https://github.com/plouc/cucurbit/issues)

![UI screenshot](https://raw.githubusercontent.com/plouc/cucurbit/master/ui.png)

## Installation

```
npm i -g cucurbit
```

## Usage

Assuming you've got an existing project with the following structure:

```
my_project/
  tests/
    features/
    support/
```

You can run

```
cucurbit start --require tests/support --features tests/features
```

This will start the cucurbit server and launch the UI
(both available on default port: 5000).

You can run `cucurbit --help` for additional help about the cli.

