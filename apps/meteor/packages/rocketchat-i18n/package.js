Package.describe({
	name: 'rocketchat:i18n',
	version: '0.0.1',
	summary: 'RocketChat i18n',
	git: '',
});

const additionalPackages = {};

const fs = Npm.require('fs');
const path = Npm.require('path');

/** Git on Windows may check out the symlink as a plain file containing the target path; Meteor needs a real directory under i18n/. */
function ensureI18nDir(rocketchatI18nRoot) {
	const i18nPath = path.join(rocketchatI18nRoot, 'i18n');
	if (!fs.existsSync(i18nPath)) {
		return i18nPath;
	}
	const st = fs.lstatSync(i18nPath);
	if (st.isFile()) {
		const rel = fs.readFileSync(i18nPath, 'utf8').trim();
		const resolved = path.resolve(rocketchatI18nRoot, rel);
		fs.unlinkSync(i18nPath);
		if (!fs.existsSync(resolved)) {
			throw new Error(
				`rocketchat-i18n: missing ${resolved}. Build workspace packages (yarn build) so packages/i18n/dist/resources exists.`,
			);
		}
		fs.cpSync(resolved, i18nPath, { recursive: true });
	}
	return i18nPath;
}

Package.onUse(function (api) {
	const workingDir = process.env.PWD || '.';
	const rocketchatI18nRoot = `${workingDir}/packages/rocketchat-i18n`;
	const i18nDir = ensureI18nDir(rocketchatI18nRoot);

	Object.keys(additionalPackages).forEach(function (current) {
		const fullPath = `${workingDir}/packages/${additionalPackages[current]}`;
		fs.readdirSync(fullPath).forEach(function (filename) {
			if (filename.indexOf('.json') > -1 && fs.statSync(`${fullPath}/${filename}`).size > 16) {
				fs.writeFileSync(`${i18nDir}/${current}.${filename}`, fs.readFileSync(`${fullPath}/${filename}`));
			}
		});
	});

	fs.readdirSync(i18nDir).forEach(function (filename) {
		if (filename.indexOf('.json') > -1 && filename.indexOf('livechat.') === -1 && fs.statSync(`${i18nDir}/${filename}`).size > 16) {
			api.addFiles(`i18n/${filename}`);
		}
	});

	api.use('rocketchat:tap-i18n');
});
