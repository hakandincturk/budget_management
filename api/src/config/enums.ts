/* eslint-disable @typescript-eslint/ban-types */
import en from '../localization/en_EN.js';
import tr from '../localization/tr_TR.js';

export const LanguageIndex : Array<String> = [ 'en', 'tr' ];

type Lang = {
	[key: string]: any;
}

export const Lang: Lang = {
	en: en,
	tr: tr
};