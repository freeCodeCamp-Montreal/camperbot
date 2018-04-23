# Contributing to camperbot
🔥🎊 Thank you for taking the time to contribute! Any contribution is highly appreciated and welcome. ⛺️

These are mostly guidelines, not rules. It is aimed for beginner to veteran developers. Use your best judgment, and feel free to propose changes to this document in a pull request.

This document takes inspiration from [Atom's Contribution Guide](https://github.com/atom/atom/blob/master/CONTRIBUTING.md#issue-and-pull-request-labels). For parts that are still in progress, feel free to reference to them.

This repo aims to be as friendly to new/budding developers, so if there is anything you would like to discuss with us about contributing, feel free to message the admins here: https://discord.gg/WZB4AuS :sparkles:

# How to Contribute
There are different ways for you to contribute, even if it's not via code! Look out for labels like `first-timer-only` or `good-first-issue` in our issues if you're not sure what to do.

To contribute, you can:

## Report Bugs :bug:
If the bot has an odd behaviour, feel free to tell us!

1. Check if the issue exists first: https://github.com/sirMerr/camperbot/issues
2. If it doesn't, make a new [issue](https://github.com/sirMerr/camperbot/issues/new)! Follow the template.

## Suggest Enhancements :tada:
If you feel like the bot is missing something, let us know. Go to https://github.com/sirMerr/camperbot/issues/new?template=change.md and fill in the template.

## Add documentation :memo:
Documentation is incredibly important, and is needed everywhere. Be it the markdown files (this one for example) or code documentation, we always need help in this department, especially in early development. Simply make a pull request with the file(s) you are helping to fix and you will be prompted with a template you can fill.

There are a few ways to make a pull request. If you just want to change a single file with a small documentation change or  markdown file, it's suggested to click on the pencil icon next to the file in GitHub.

## Contribute Code :sparkles:
:construction:

# Styleguides

### git Branches
Your branch name should try to start with one of the following followed by the main feature you're working on:

* `feature/avatars` for when you are adding a new feature
* `fix/` for when you are making a fix for a bug
* `optimize/` for when you are not inherently changing the behaviour of something, but are still making it better

Example: `feature/avatars`, `fix/docs-typo`

### git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 50 characters or less (not including emojis!)
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with an applicable emoji:
    * :sparkles: `:sparkles:` when adding a new feature
    * :hammer: `:hammer:` when improving the format/structure of the code
    * :racehorse: `:racehorse:` when improving performance
    * :non-potable_water: `:non-potable_water:` when plugging memory leaks
    * :memo: `:memo:` when writing docs
    * :bug: `:bug:` when fixing a bug
    * :fire: `:fire:` when removing code or files
    * :green_heart: `:green_heart:` when fixing the CI build
    * :white_check_mark: `:white_check_mark:` when adding tests
    * :lock: `:lock:` when dealing with security
    * :arrow_up: `:arrow_up:` when upgrading dependencies
    * :arrow_down: `:arrow_down:` when downgrading dependencies
    * :wrench: `:wrench:`when updating configuration files

### JavaScript Styleguide
All code adheres to [prettier](prettier.io) standards with two differences, found in our [.prettierrc](./.prettierrc):
```
{
	"trailingComma": "es5",
	"singleQuote": true
}
```

You can configre your text editor/IDE to show warnings and errors when you do not follow these standards if you would like. However, **when you make a commit, a prehook will automatically lint staged filed, so there is no real need to worry about styling** unless you want to keep yourself to that standard on your own.
