const Logger = require('js-logger');
const colors = require('colors');
const settings = require('./config/settings');

const app = require('./app');

Logger.useDefaults();

app.listen(settings.PORT, (err) => {
  if (err) {
    Logger.error(colors.red('Server error: %s'), err.message);
  }
  console.info(colors.cyan('Server started on port %s.'), settings.PORT);
});
