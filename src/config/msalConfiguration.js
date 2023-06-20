// MSAL configuration
const tenent_domain = "";
const configuration = {
	auth: {
		clientId: "",
		authority: `https://${tenent_domain}.b2clogin.com/${tenent_domain}.onmicrosoft.com/B2C_1_signup_signin`, // Choose SUSI as your default authority.
		knownAuthorities: [`${tenent_domain}.b2clogin.com`], // Mark your B2C tenant's domain as trusted.
		redirectUri: "https://localhost:3000/dashboard/",
	},
};

const loginRequest = {
	redirectStartPage: "https://localhost:3000/dashboard",
	extraQueryParameters: {
		ui_locales: "pt-br",
	},
};

const logoutRequest = (instance) => {
	return {
		account: instance.getActiveAccount(),
		postLogoutRedirectUri: "https://localhost:3000/",
	};
};

export default configuration;

export { loginRequest, logoutRequest };
