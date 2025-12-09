const fs = require('fs');
const { exec } = require('child_process');

class DatabaseBackup {
  async backupMySQL(config) {
    const { host, user, password, database, outputPath } = config;
    const command = `mysqldump -h ${host} -u ${user} -p${password} ${database} > ${outputPath}`;
    
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) reject(error);
        else resolve(outputPath);
      });
    });
  }
  
  async backupPostgreSQL(config) {
    const { host, user, password, database, outputPath } = config;
    const command = `PGPASSWORD=${password} pg_dump -h ${host} -U ${user} ${database} > ${outputPath}`;
    
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) reject(error);
        else resolve(outputPath);
      });
    });
  }
}

module.exports = new DatabaseBackup();
