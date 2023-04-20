import { Answers } from "inquirer";

const findBranches = (answers: Answers): string[] => {
    const branchesToMerge: string[] = [];
    const { useJest, usePrettier, useESLint } = answers;
    useJest && branchesToMerge.push("origin/feature-jest");
	usePrettier && branchesToMerge.push("origin/feature-prettier");
	useESLint && branchesToMerge.push("origin/feature-eslint");
    return branchesToMerge;
};

export default findBranches;