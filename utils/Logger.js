import chalk from 'chalk';
import dayjs from 'dayjs';

const format = '{tstamp} {tag} {txt}\n';

function error(content) {
    write(content, 'black', 'bgRed', 'ERROR', true);
}
function warn(content) {
    write(content, 'black', 'bgYellow', 'WARN', false);
}
function typo(content) {
    write(content, 'black', 'bgCyan', 'TYPO', false);
}
function command(content) {
    write(content, 'black', 'bgMagenta', 'CMD', false);
}
function event(content) {
    write(content, 'black', 'bgGreen', 'EVT', false);
}
function client(content) {
    write(content, 'black', 'bgBlue', 'CLIENT', false);
}

function write(content, tagColor, bgTagColor, tag, error = false) {
    const timestamp = `[${dayjs().format('DD/MM - HH:mm:ss')}]`;
    const logTag = `[${tag}]`;
    // stderr = error, stdout = log
    const stream = error ? process.stderr : process.stdout;

    const item = format
        .replace('{tstamp}', chalk.gray(timestamp))
        .replace('{tag}', chalk[bgTagColor][tagColor](logTag))
        .replace('{txt}', chalk.white(content));
    
    stream.write(item);
}

export { error, warn, typo, command, event, client };
