import { Answers } from "inquirer";

const findBranch = (answers: Answers) => {
    const { useJest } = answers;
    return useJest ? "feature-jest" : "main";
};

export default findBranch;