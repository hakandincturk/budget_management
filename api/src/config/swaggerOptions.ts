import 'dotenv/config';

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {

	info: {
		version: '1.0.0',
		title: 'Budget Management API'
	},
	security: {
		BasicAuth: {
			type: 'http',
			scheme: 'basic'
		}
	},
	// Base directory which we use to locate your JSDOC files
	baseDir: __dirname,
	// Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
	filesPattern: [
		'../../Public/Controllers/*.ts'
	],
	// URL where SwaggerUI will be rendered
	swaggerUIPath: '/api-docs',
	// Expose OpenAPI UI
	exposeSwaggerUI: true,
	// Expose Open API JSON Docs documentation in `apiDocsPath` path.
	exposeApiDocs: false,
	// Open API JSON Docs endpoint.
	apiDocsPath: '/v3/api-docs',
	// Set non-required fields as nullable by default
	notRequiredAsNullable: false,
	/*
	 * You can customize your UI options.
	 * you can extend swagger-ui-express config. You can checkout an example of this
	 * in the `example/configuration/swaggerOptions.js`
	 */
	swaggerUiOptions: {},
	// multiple option in case you want more that one instance
	multiple: true

	/*
	 * swaggerDefinition: {
	 * 	info: {
	 * 		description: 'Cimsa Ödüllendirme Backend Documentation',
	 * 		title: 'Cimsa Ödüllendirme',
	 * 		version: '1.0.0'
	 * 	},
	 * 	host: `${process.env.SWAGGER_URI}`, //for ngrok
	 * 	basePath: '',
	 * 	produces: [
	 * 		'application/json',
	 * 		'application/xml'
	 * 	],
	 * 	schemes: 'http',
	 * 	security: [
	 * 		{
	 * 			ngrokSkipBrowserWarning: [],
	 * 			cookieAuth: [],
	 * 			language: []
	 * 		}
	 * 	],
	 * 	securityDefinitions: {
	 * 		ngrokSkipBrowserWarning: {
	 * 			type: 'apiKey',
	 * 			in: 'header',
	 * 			name: 'ngrok-skip-browser-warning'
	 * 		},
	 * 		cookieAuth: {
	 * 			type: 'apiKey',
	 * 			in: 'cookie',
	 * 			name: 'access-token',
	 * 			description: ''
	 * 		},
	 * 		language: {
	 * 			type: 'apiKey',
	 * 			in: 'header',
	 * 			name: 'language',
	 * 			description: ''
	 * 		}
	 * 	}
	 * },
	 * route: {
	 * 	url: '/odullendirmeswagger',
	 * 	docs: '/odullendirme.json'
	 * },
	 * basedir: __dirname, // app absolute path
	 * files: [
	 * 	'../../controllers/*.js',
	 * 	'../../Admin/Controllers/*.js'
	 * ]
	 */
};