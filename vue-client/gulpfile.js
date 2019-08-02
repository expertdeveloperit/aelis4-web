const gulp = require('gulp');
const sonarqubeScanner = require('sonarqube-scanner');

gulp.task('sonar', (callback) => {
  sonarqubeScanner({
    serverUrl: 'https://sonarcloud.io',
    token: '4f064af5253bb66d106f8b2e33e00dc4acbb6a97',
    options: {
      'sonar.organization': 'kometsales',
      'sonar.projectKey': 'vertical_aelis4-web',
      'sonar.sources': '.',
      'sonar.eslint.reportPaths': 'reportLint.txt'
    }
  }, callback);
});
