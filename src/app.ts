export function evaluate(command : string) {
    return "Result: " + command.split('').reverse().join('');
}