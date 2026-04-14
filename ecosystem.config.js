module.exports = {
  apps: [{
    name: 'spiral-test',
    script: 'server.js',
    cwd: '/var/www/spiral-tracker-test',
    env: {
      PORT: 3001,
      DB_PATH: '/var/www/spiral-tracker-test/spiral-test.db'
    }
  }]
};
