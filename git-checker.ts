/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import { italic, bold, red, green } from "https://deno.land/std@0.134.0/fmt/colors.ts";

const cwd = Deno.cwd();

type Repo = {
	safe: boolean;
	name: string;
	status: string;
	emoji: string;
}

const repos: Repo[] = [];

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
		"to be committed": "needs to be committed",
		"not staged for commit": "has un-staged changes",
		"Untracked files": "has un-tracked files",
		"is ahead of": "needs to be pushed"
	}

	const emojis = {
		"to be committed": "✍️",
		"not staged for commit": "🗂",
		"Untracked files": "🤯",
		"is ahead of": "☁️",
	}

	let ret: string | undefined = undefined;
	let emoji: string | undefined;

	for (const posMsg in possibleMessages) {
		if (msg.includes(posMsg)) {
			// @ts-ignore ignore type index on string
			ret = possibleMessages[posMsg];
			// @ts-ignore ignore type index on string
			emoji = emojis[posMsg];
			break;
		}
	}

	repos.push({
		safe: ret === undefined,
		status: ret ?? "",
		name: path.name,
		emoji: emoji ?? "🔥"
	})

}


const printRepo = (repo: Repo) => {
	console.log((repo.safe ? "✅" : "❌") + " " + repo.emoji + " " + bold(repo.name) + (repo.safe ? green : red)(" " + repo.status));
}

const sorter = (a: Repo, b: Repo): number => {
	return a.name.localeCompare(b.name);
}

repos.filter(r => r.safe).sort(sorter).forEach(printRepo);
repos.filter(r => !r.safe).sort(sorter).forEach(printRepo);