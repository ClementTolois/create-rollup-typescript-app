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
		choices: ["npm", "pnpm", "yarn"]
	},
	{
		type: "confirm",
		name: "useJest",
		message: "Do you want to use Jest ?",
		default: true
	},
	{
		type: "confirm",
		name: "useESLint",
		message: "Do you want to use ESLint ?",
		default: true
	},
    {
        type: "confirm",
        name: "usePrettier",
        message: "Do you want to use Prettier ?",
        default: true
    },
    {
        type: "confirm",
        name: "openVSCode",
        message: "Do you want to open the project in VSCode after installation?",
        default: true
    }
];

export default questions;