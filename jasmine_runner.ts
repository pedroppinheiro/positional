const Jasmine = require('jasmine');

const jasmineRunner = new Jasmine();

const config = {
  spec_dir: 'test',
  spec_files: [
    '*.ts',
  ],
};

jasmineRunner.loadConfig(config);
jasmineRunner.configureDefaultReporter({
  showColors: true,
});
jasmineRunner.execute();
