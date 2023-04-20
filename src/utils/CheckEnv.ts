import { exit } from 'process';
import shell from 'shelljs';

const checkGit = (): void => {
	if (!shell.which('git')) {
		throw 'Sorry, this script requires git';
    }
}

const checkEnv = (): void => {
    checkGit();
}

export default checkEnv;