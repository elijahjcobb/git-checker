/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import { italic, bold, red, green } from "https://deno.land/std/fmt/colors.ts";

const cwd = Deno.cwd();

for (const path of Deno.readDirSync(cwd)) {

	if (path.isDirectory !== true) continue;
	const newPath = cwd + "/" + path.name;
	try { await Deno.stat(newPath + "/.git"); } catch (e) { continue; }

	const p = Deno.run({
		cmd: ["git", "status"],
		cwd: newPath,
		stderr: "null",
		stdin: "null",
		stdout: "piped"
	});

	const status = await p.status();
	if (status.code !== 0) continue;
	const stdout = await p.output();
	const msg = new TextDecoder("utf8").decode(stdout);

	const possibleMessages = {
		"to be committed": "has staged changes that have not been committed",
		"not staged for commit": "has changes that have not been staged",
		"Untracked files": "has un-tracked files that have not been ignored",
		"is ahead of": "needs to be pushed"
	}

	let ret: string | undefined = undefined;

	for (const posMsg in possibleMessages) {
		if (msg.includes(posMsg)) {
			// @ts-ignore
			ret = possibleMessages[posMsg];
			break;
		}
	}

	console.log(italic(newPath) + ": " + bold(ret === undefined ? green("clean!") : red(ret + ".")));

}

