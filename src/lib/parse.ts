export function parseStdOut<T>(stdout: string): T {
    try {
        // enforce 'jsonKey' to be "jsonKey" because python dict key use single quote
        // for example "{'key': 'value'}"" is not valid string to be parsed by JSON.parse
        const correctedResultString = stdout.replace(/'/g, '"');
        return JSON.parse(correctedResultString);
    } catch (error) {
        console.log(error);
        throw new Error(`Failed to parse stdout: ${stdout}`);
    }
}