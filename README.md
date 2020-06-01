# git-checker
A helpful tool to check if any projects in a directory have any un-staged, un-committed, or not pushed files. Written
in TypeScript with Deno.

#### Installing
`deno install --allow-run --allow-read https://raw.githubusercontent.com/elijahjcobb/git-checker/master/git-checker.ts`

#### Running
`git-checker`

Will look for all directories inside the current working directory. If they have a `.git` directory
inside them it will check the status of the repository. It will then report on the status of the directory.

#### Output
In the example below the current working directory is: `/home/elijah/Projects`.
```
git-checker: clean!
template: has changes that have not been staged.
silicon: has staged changes that have not been committed.
```

#### Permissions
This requires `--allow-read` to read the child directories and the current working directory. It also requires
`--allow-run` to run `git status`. 

#### Requirements
**As of now**, this will only search one level in the current working directory. It is not recursive.