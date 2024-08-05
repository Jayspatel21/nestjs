// fetch-secrets.js

const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// Configure the AWS SDK
const region = 'us-east-1'; // Change to your AWS region
const secretName = 'Envfile'; // Change to your secret name

AWS.config.update({ region });

const client = new AWS.SecretsManager();

const fetchSecrets = async () => {
  try {
    const data = await client.getSecretValue({ SecretId: secretName }).promise();
    if (data.SecretString) {
      const secrets = JSON.parse(data.SecretString);

      // Set each secret as an environment variable
      const envVars = Object.entries(secrets).map(([key, value]) => `${key}=${value}`).join('\n');
      fs.writeFileSync(path.join(__dirname, '.env'), envVars);

      console.log('Secrets successfully fetched and stored in .env file.');
    }
  } catch (err) {
    console.error('Error fetching secrets:', err);
  }
};

fetchSecrets();
