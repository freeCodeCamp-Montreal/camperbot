# Contributing to camperbot
🔥🎊 Thank you for taking the time to contribute! Any contribution is highly appreciated and welcome. ⛺️

These are mostly guidelines, not rules. It is aimed for beginner to veteran developers. Use your best judgment, and feel free to propose changes to this document in a pull request.

This document takes inspiration from [Atom's Contribution Guide](https://github.com/atom/atom/blob/master/CONTRIBUTING.md#issue-and-pull-request-labels). For parts that are still in progress, feel free to reference to them.

# How to Contribute
🚧
## Report Bugs
## Suggest Enhancements
## Add documentation
## Contribute Code


# Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* When only changing documentation, include `[ci skip]` in the commit title
* Consider starting the commit message with an applicable emoji:
    * :art: `:art:` when improving the format/structure of the code
    * :racehorse: `:racehorse:` when improving performance
    * :non-potable_water: `:non-potable_water:` when plugging memory leaks
    * :memo: `:memo:` when writing docs
    * :penguin: `:penguin:` when fixing something on Linux
    * :apple: `:apple:` when fixing something on macOS
    * :checkered_flag: `:checkered_flag:` when fixing something on Windows
    * :bug: `:bug:` when fixing a bug
    * :fire: `:fire:` when removing code or files
    * :green_heart: `:green_heart:` when fixing the CI build
    * :white_check_mark: `:white_check_mark:` when adding tests
    * :lock: `:lock:` when dealing with security
    * :arrow_up: `:arrow_up:` when upgrading dependencies
    * :arrow_down: `:arrow_down:` when downgrading dependencies
    * :shirt: `:shirt:` when removing linter warnings

### JavaScript Styleguide
All code adheres to [prettier](prettier.io) standards with two differences, found in our [.prettierrc](./.prettierrc):
```
{
	"trailingComma": "es5",
	"singleQuote": true
}
```

You can configre your text editor/IDE to show warnings and errors when you do not follow these standards if you would like. However, **when you make a commit, a prehook will automatically lint staged filed, so there is no real need to worry about styling** unless you want to keep yourself to that standard on your own.