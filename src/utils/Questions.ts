import { QuestionCollection } from "inquirer";

const questions: QuestionCollection = [
    {
        type: "input",
        name: "projectName",
        message: "Project name ?"
    },
    {
        type: "list",
        name: "packageManager",
        message: "Which package manager do you want to use ?",
        choices: ["npm","pnpm","yarn"]
    },
    {
        type: "confirm",
        name: "useJest",
        message: "Do you want to use Jest ?",
        default: true
    }
];

export default questions;