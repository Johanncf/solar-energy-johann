// MSAL configuration
const configuration = {
  auth: {
      clientId: "",
      authority: "", // Choose SUSI as your default authority.
      knownAuthorities: [""], // Mark your B2C tenant's domain as trusted.
      redirectUri: 'https://localhost:3000/'
  }
};

export default configuration;