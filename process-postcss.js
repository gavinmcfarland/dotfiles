const fs = require('fs');
const postcss = require('postcss');
const atImport = require('postcss-import');
const postcssrc = require('postcss-load-config');

const ctx = { parser: true, map: 'inline' };

export default function processPostCSS(input, output) {
	fs.readFile(input, (err, css) => {
		postcssrc(ctx).then(({ plugins, options }) => {
			postcss(plugins).process(css, { from: input, to: output }).then((result) => {
				fs.writeFile(output, result.css, () => true);
				if (result.map) {
					fs.writeFile(output + '.map', result.map, () => true);
				}
			});
		});
	});
}

// example
// processPostCSS('./src/styles/index.css', './static/global.css');

