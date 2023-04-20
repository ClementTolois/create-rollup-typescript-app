import { Answers } from "inquirer";

const findBranches = (answers: Answers): string[] => {
    const branchesToMerge: string[] = [];
    const { useJest, usePrettier } = answers;
    useJest && branchesToMerge.push("origin/feature-jest");
    usePrettier && branchesToMerge.push("origin/feature-prettier");
    return branchesToMerge;
};

export default findBranches;