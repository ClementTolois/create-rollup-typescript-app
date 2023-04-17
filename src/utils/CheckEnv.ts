import shell from 'shelljs';

const checkGit = (): void => {
    if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git');
        shell.exit(1);
    }
}

const checkEnv = (): void => {
    checkGit();
}

export default checkEnv;