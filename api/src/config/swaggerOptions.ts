import 'dotenv/config';

export default {
	swaggerDefinition: {
		info: {
			description: 'Cimsa Ödüllendirme Backend Documentation',
			title: 'Cimsa Ödüllendirme',
			version: '1.0.0'
		},
		host: `${process.env.SWAGGER_URI}`, //for ngrok
		basePath: '',
		produces: [
			'application/json',
			'application/xml'
		],
		schemes: 'http',
		security: [
			{
				ngrokSkipBrowserWarning: [],
				cookieAuth: [],
				language: []
			}
		],
		securityDefinitions: {
			ngrokSkipBrowserWarning: {
				type: 'apiKey',
				in: 'header',
				name: 'ngrok-skip-browser-warning'
			},
			cookieAuth: {
				type: 'apiKey',
				in: 'cookie',
				name: 'access-token',
				description: ''
			},
			language: {
				type: 'apiKey',
				in: 'header',
				name: 'language',
				description: ''
			}
		}
	},
	route: {
		url: '/odullendirmeswagger',
		docs: '/odullendirme.json'
	},
	basedir: __dirname, // app absolute path
	files: [
		'../../controllers/*.js',
		'../../Admin/Controllers/*.js'
	]
};