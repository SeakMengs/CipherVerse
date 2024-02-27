import fs from 'fs';
import { spawn } from 'child_process';

function readRequirements(filePath) {
    // Split by newlines, handling both Windows and Unix line endings
    const requirements = fs.readFileSync(filePath, 'utf-8').split(/\r?\n/);
    // Filter out empty lines and comments and remove version numbers 
    return requirements.filter(line => line.trim().length > 0).map(line => line.split(/==/)[0]);
}

async function main() {
    const requirements = readRequirements('py/requirements.txt');
    const hiddenImports = requirements.map(pkg => `--hidden-import=${pkg}`).join(' ');
    const pyInstallerCmd = `pyinstaller -F py/main.py --distpath src-tauri/bin/python/ --clean -n main ${hiddenImports}`;

    console.log('Running pyinstaller command:', pyInstallerCmd);    

    const pyInstaller = spawn(pyInstallerCmd, { shell: true });

    pyInstaller.stdout.on('data', data => {
        console.log(data.toString());
    });

    pyInstaller.stderr.on('data', data => {
        console.error(data.toString());
    });

    pyInstaller.on('exit', code => {
        console.log(`PyInstaller process exited with code ${code}`);
    });
}

main().catch(err => {
    console.error(err);
});
