/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

const cwd = Deno.cwd();

for (const path of Deno.readDirSync(cwd)) {
	if (path.isDirectory !== true) continue;

	const newPath = cwd + "/" + path.name;

	if (newPath !== "/home/elijah/Projects/git-checker") continue;

	try {
		await Deno.stat(newPath + "/.git");
	} catch (e) {
		continue;
	}

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

	console.log(msg);

	const possibleMessages = [
		"to be committed",
		"not staged for commit",
		"Untracked files",
		"is ahead of"
	]

	let ret = false;

	for (const posMsg of possibleMessages) {
		console.log(posMsg);
		if (msg.includes(posMsg)) {
			ret = true;
			break;
		}
	}

	if (ret) {
		console.log(`${newPath} has changes not saved.`);
	}


}

