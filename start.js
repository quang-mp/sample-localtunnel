const localtunnel = require('localtunnel');
const config = require('./config.json');

async function startTunnels() {
  for (const tunnel of config.tunnels) {
    try {
      const tunnelInstance = await localtunnel({
        port: tunnel.port,
        subdomain: tunnel.subdomain
      });
      console.log(`Tunnel started for port ${tunnel.port}: ${tunnelInstance.url}`);
      
      tunnelInstance.on('close', () => {
        console.log(`Tunnel for port ${tunnel.port} closed`);
      });
    } catch (error) {
      console.error(`Error starting tunnel for port ${tunnel.port}:`, error.message);
    }
  }
}

startTunnels();