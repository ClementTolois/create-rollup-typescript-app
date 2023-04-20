import inquirer from 'inquirer';
import { exec } from 'child_process';
import fs from 'fs';
import { rimraf } from 'rimraf';

import checkEnv from '@/utils/CheckEnv';
import questions from '@/utils/Questions';
import Spinner from '@/utils/Spinner';
import findBranches from '@/utils/FindBranches';

const GIT_REPOSITORY = 'git@github.com:ClementTolois/rollup-typescript-app-template.git';

const execute = (command: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            resolve();
        });
    });
};

const updatePackageJson = (projectName: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const packageJson = JSON.parse(fs.readFileSync(`./${projectName}/package.json`, 'utf8'));
        packageJson.name = projectName;
        fs.writeFileSync(`./${projectName}/package.json`, JSON.stringify(packageJson, null, 2));
        resolve();
    });
};

checkEnv();
inquirer.prompt(questions).then(async answers => {
    const { projectName, packageManager, openVSCode } = answers;
    const branches = findBranches(answers);

    Spinner.start("Creating project...");
    await execute(`mkdir ${projectName}`);

    Spinner.update("Cloning repository...");
    await execute(`git clone ${GIT_REPOSITORY} ./${projectName}`);

    for (const branch of branches) {
        Spinner.update(`Merging branch ${branch}...`);
        await execute(`cd ${projectName} && git merge ${branch}`);
    }

    Spinner.update("Updating package.json...");
    await updatePackageJson(projectName);
    
    Spinner.update("Initializing git repository...");
    await rimraf(`${projectName}/.git`);
    await execute(`cd ${projectName} && git init`);
    await execute(`cd ${projectName} && git add .`);
    await execute(`cd ${projectName} && git commit -m "Initial commit"`);

    Spinner.update("Installing dependencies...");
    await execute(`cd ${projectName} && ${packageManager} install`);
    Spinner.stop();
    console.log(`Project ${projectName} created! Enjoy 😊`);

    if (openVSCode) {
        await execute(`code ./${projectName}`);
    }
});