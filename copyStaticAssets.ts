import * as shell from 'shelljs';

shell.cp('-R', 'src/renderer_process/assets/css', 'dist/renderer_process/assets/css/');
shell.cp('-R', 'src/renderer_process/pages', 'dist/renderer_process/pages/');
// shell.cp('-R', 'src/public/images', 'dist/public/');
