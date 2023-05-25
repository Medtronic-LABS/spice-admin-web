const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner(
  {
    options: {
      'sonar.sources': './src',
      'sonar.tests': './src/',
      'sonar.test.inclusions': '*.test.{ts,tsx}',
      'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info'
    }
  },
  () => process.exit()
);
