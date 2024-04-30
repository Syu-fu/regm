# regm

[![ci](https://github.com/Syu-fu/regm/actions/workflows/test.yml/badge.svg)](https://github.com/Syu-fu/regm/actions/workflows/test.yml)
[![build](https://github.com/Syu-fu/regm/actions/workflows/build.yml/badge.svg)](https://github.com/Syu-fu/regm/actions/workflows/build.yml)
[![GitHub License](https://img.shields.io/github/license/Syu-fu/regm)](LICENSE)
[![deno version](https://img.shields.io/badge/deno-%5E1.40.0-green?logo=deno)](https://deno.land)

`regm` is an interactive command-line tool for matching regular expressions.  
It provides a simple interface for testing regular expressions against input text,
supporting various flavors of regular expressions such as ECMA, Basic (BRE), Extended (ERE), PCRE, Vim, and RE2.

## Install

```bash
# Deno
$ deno install --allow-env --allow-read --import-map https://deno.land/x/regm/import_map.json https://deno.land/x/regm/regm.ts --name regm --force

# Homebrew
$ brew install Syu-fu/tap/regm
```

## Example

![regm.gif](https://private-user-images.githubusercontent.com/61235023/326812632-51347b16-4308-478d-991b-00893f2d9262.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTQ0ODE3MzEsIm5iZiI6MTcxNDQ4MTQzMSwicGF0aCI6Ii82MTIzNTAyMy8zMjY4MTI2MzItNTEzNDdiMTYtNDMwOC00NzhkLTk5MWItMDA4OTNmMmQ5MjYyLmdpZj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA0MzAlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNDMwVDEyNTAzMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTY0MmMxNmJjNWU2MzAwYTljZGUxN2U5ZjkxMjM0YTg5Nzg1NTAzZWM0ZjMzNDA2YjFiZTZhMDRjMjVmYWZkZmEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.se-IJ1hxUvhpB_eyRkAfTjFH7MpmGrD9dz0-HmQ0GHA)

```bash
$ echo -e "apple\nbanana\norange\npear\ngrape\nkiwi" > match.txt
# stdout shows the input when the Enter key is pressed.
$ regm -f match.txt | pbcopy
```

## Usage

### Options

| Option            | Description                             |
| ----------------- | --------------------------------------- |
| -h, --help        | Display help information.               |
| -V, --version     | Display the version number.             |
| -f, --file <file> | Read input text from a file. (required) |

### Flavor options

Choose one of the following flavor options (defaults to ECMA flavor if not specified):

| Option         | Description                                                                                                          |
| -------------- | -------------------------------------------------------------------------------------------------------------------- |
| -e, --ecma     | [ECMA](https://262.ecma-international.org/12.0/#sec-regexp-regular-expression-objects) flavor. (JavaScript, Java)    |
| -b, --basic    | [Basic](https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap09.html#tag_09_03) flavor (BRE).(grep)      |
| -x, --extended | [Extended](https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap09.html#tag_09_04) flavor (ERE). (egrep) |
| -p, --pcre     | [PCRE](https://www.pcre.org/) flavor. (Perl, PHP)                                                                    |
| -v, --vim      | [Vim](https://vimhelp.org/pattern.txt.html) flavor. (Vim, Neovim)                                                    |
| -r, --re2      | [RE2](https://github.com/google/re2) flavor. (Go, Python)                                                            |

### Completion

#### Add .bashrc

```bash
source <(regm completions bash)
```

#### zsh

Add .zshrc

```zsh
source <(regm completions zsh)
```

#### fish

Add config.fish

```fish
source (regm completions fish | psub)
```
