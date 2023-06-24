// MSAL configuration
const tenent_domain = "solarenergyjohann";
const configuration = {
	auth: {
		clientId: "75abf102-3152-4f0c-b467-13d11e8b65df",
		authority: `https://${tenent_domain}.b2clogin.com/${tenent_domain}.onmicrosoft.com/B2C_1_signup_signin`, // Choose SUSI as your default authority.
		knownAuthorities: [`${tenent_domain}.b2clogin.com`], // Mark your B2C tenant's domain as trusted.
		redirectUri: "https://localhost:3000/dashboard/",
		scopes: ["https://solarenergyjohann.onmicrosoft.com/880155ac-ef66-4774-94b1-df98bf8b7c26/user_acess"],
	},
};

const loginRequest = {
	redirectStartPage: "https://localhost:3000/dashboard",
	//scopes: ["openid", "user_acess"],
	extraQueryParameters: {
		ui_locales: "pt-br",
	},
};

const logoutRequest = (instance) => {
	return {
		account: instance.getActiveAccount(),
		postLogoutRedirectUri: "https://localhost:3000/",
		//scopes: ["openid", "user_acess"],
	};
};

export default configuration;

export { loginRequest, logoutRequest };
