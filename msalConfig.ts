// msalConfig.js
import { LogLevel, PublicClientApplication } from '@azure/msal-browser';

export const tokenRequest = {
  scopes: [
    'https://jobtrackerb2c.onmicrosoft.com/3c34cc85-4a28-4c95-bffd-346a0edc2b4b/access_as_user',
  ], // e.g. ["https://fabrikamb2c.onmicrosoft.com/helloapi/demo.read"]
  forceRefresh: true, // Set this to "true" to skip a cached token and go to the server to get a new token
};

const msalConfig = {
  auth: {
    clientId: '20b71706-e08b-4144-a067-228f4f50f8bf', // Application (client) ID from Azure AD B2C
    authority:
      'https://jobtrackerb2c.b2clogin.com/jobtrackerb2c.onmicrosoft.com/B2C_1_signupsignin', // B2C sign-in policy
    redirectUri: 'http://localhost:3000/login', // Redirect URI for local development
    knownAuthorities: ['jobtrackerb2c.b2clogin.com'], // B2C domain
  },
  cache: {
    cacheLocation: 'localStorage', // "sessionStorage" is also available
    storeAuthStateInCookie: false, // Set to "true" if you have issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: any, message: any, containsPii: any) => {
        if (containsPii) return;
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Info:
            // console.info(message)
            break;
          case LogLevel.Verbose:
            console.debug(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
            break;
        }
      },
    },
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

export async function initializeMsalInstance() {
  await msalInstance.initialize(); // Explicitly call initialize to set up MSAL
  return msalInstance;
}

export default msalConfig;
