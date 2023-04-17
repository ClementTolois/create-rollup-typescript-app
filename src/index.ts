import inquirer from 'inquirer';
import shell from 'shelljs';
import fs from 'fs';
import { rimraf } from 'rimraf';

import checkEnv from '@/utils/CheckEnv';
import questions from '@/utils/Questions';
import Spinner from '@/utils/Spinner';
import findBranch from '@/utils/FindBranch';

const GIT_REPOSITORY = 'git@github.com:ClementTolois/rollup-typescript-app-template.git';

checkEnv();
inquirer.prompt(questions).then(async answers => {
    const { projectName, packageManager } = answers;
    const branch = findBranch(answers);

    Spinner.start("Creating project...");
    shell.exec(`mkdir ${projectName}`, { silent: true });
    shell.cd(projectName);

    Spinner.update("Cloning repository...");
    shell.exec(`git clone ${GIT_REPOSITORY} .`, { silent: true });
    shell.exec(`git checkout ${branch}`, { silent: true });

    Spinner.update("Updating package.json...");
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    packageJson.name = projectName;
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
    
    Spinner.update("Initializing git repository...");
    await rimraf('.git');
    shell.exec(`git init`, { silent: true });
    shell.exec(`git add .`, { silent: true });
    shell.exec(`git commit -m "Initial commit"`, { silent: true });

    Spinner.update("Installing dependencies...");
    shell.exec(`${packageManager} install`, { silent: true });
    Spinner.stop();
    console.log(`Project ${projectName} created !`);
});