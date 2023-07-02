// MSAL configuration

const CLIENT_ID = "75abf102-3152-4f0c-b467-13d11e8b65df"
const TENENT_DOMAIN = "solarenergyjohann"
const API_SCOPE = "user_access"
const APP_DOMAIN = "https://localhost:3000"

const scopes = [`https://${TENENT_DOMAIN}.onmicrosoft.com/api/${API_SCOPE}`];

const configuration = {
	auth: {
		clientId: CLIENT_ID,
		authority: `https://${TENENT_DOMAIN}.b2clogin.com/${TENENT_DOMAIN}.onmicrosoft.com/B2C_1_signup_signin`, // Choose SUSI as your default authority.
		knownAuthorities: [`${TENENT_DOMAIN}.b2clogin.com`], // Mark your B2C tenant's domain as trusted.
		redirectUri: `${APP_DOMAIN}/dashboard`
	}
};

const loginRequest = {
	redirectStartPage: `${APP_DOMAIN}/dashboard`,
	//scopes: ["openid", "user_acess"],
	extraQueryParameters: {
		ui_locales: "pt-br",
	},
};

const tokenRequest = (instance) => {
	return {
		account: instance.getAllAccounts()[0],
		scopes: scopes
	};
};

const logoutRequest = (instance) => {
	return {
		account: instance.getActiveAccount(),
		postLogoutRedirectUri: `${APP_DOMAIN}`
	};
};

export default configuration;

export { loginRequest, scopes, tokenRequest, logoutRequest };
