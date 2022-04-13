# git-checker
A helpful tool to check the status of all projects in the current working directory. This tool will check if any have
 un-staged, un-committed, or not pushed files. Written in TypeScript with Deno.

#### Installing
```bash
deno install
	--allow-run
	--allow-read
	https://raw.githubusercontent.com/elijahjcobb/git-checker/main/git-checker.ts
```

*If you want to run without installing, simply change* `install` *to* `run`.

#### Running
`git-checker`

Will look for all directories inside the current working directory. If they have a `.git` directory
inside them it will check the status of the repository. It will then report on the status of the directory.

#### Output
[![asciicast](https://asciinema.org/a/zIVRRiwW0rbjMWhqTQnPN0ArW.svg)](https://asciinema.org/a/zIVRRiwW0rbjMWhqTQnPN0ArW)

#### Permissions
This requires `--allow-read` to read the child directories and the current working directory. It also requires
`--allow-run` to run `git status`. 

#### Requirements
**As of now**, this will only search one level in the current working directory. It is not recursive.