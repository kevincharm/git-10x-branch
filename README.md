# git-10x-branch

Supercharges your `git-branch`, mainly by implementing an interactive branch select.

## Installation

Install it:
```sh
npm install -g git-10x-branch
```

Alias it and instantly become a 10x developer:
```sh
alias b='git-10x-branch'
```

## Usage

Use `up`, `down` or `j`, `k` keys to navigate branches and `enter` to select a branch. Like in vi, you can trigger last line command mode by using `:`. Use `esc`, `q` or `ctrl+c` to exit.

### Commands:
- `:de`
Delete branch. Equivalent to `git branch -d <branch name>`.
- `:de!`
Force delete branch. Equivalent to `git branch -D <branch name>`.
- `:q`
Exit (quit) program.
