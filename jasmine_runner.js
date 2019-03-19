const Jasmine = require('jasmine');

const jasmine = new Jasmine();

const config = {
  spec_dir: 'test',
  spec_files: [
    '*.js',
  ],
};

jasmine.loadConfig(config);
jasmine.configureDefaultReporter({
  showColors: true,
});
jasmine.execute();
