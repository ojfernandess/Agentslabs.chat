import { Users } from './fixtures/userStates';
import { setSettingValueById } from './utils/setSettingValueById';
import { setUserPreferences } from './utils/setUserPreferences';
import { test, expect } from './utils/test';

test.use({ storageState: Users.admin.state });

test.describe('Translations', () => {
	test.beforeAll(async ({ api }) => {
		expect((await setUserPreferences(api, { language: '' })).status()).toBe(200);
		expect((await setSettingValueById(api, 'Language', 'en')).status()).toBe(200);
		expect((await setSettingValueById(api, 'Site_Name', 'Agents Labs Chat PRO')).status()).toBe(200);
	});

	test.afterAll(async ({ api }) => {
		expect((await setUserPreferences(api, { language: '' })).status()).toBe(200);
		expect((await setSettingValueById(api, 'Language', 'en')).status()).toBe(200);
	});

	test("expect to display text in the user's preference language", async ({ page, api }) => {
		await page.goto('/home');
		await page.waitForTimeout(5000);
		await expect(page.locator('h2')).toHaveText('Welcome to Agents Labs Chat PRO');

		const response = page.waitForResponse('**/i18n/pt-BR.json');
		expect((await setUserPreferences(api, { language: 'pt-BR' })).status()).toBe(200);
		await response;
		await expect(page.locator('h2')).toHaveText('Bem-vindo ao Agents Labs Chat PRO');
		expect((await setUserPreferences(api, { language: '' })).status()).toBe(200);
	});

	test('expect to keep chosen language after refresh', async ({ page, api }) => {
		await page.goto('/home');
		await expect(page.locator('h2')).toHaveText('Welcome to Agents Labs Chat PRO');

		const response = page.waitForResponse('**/i18n/pt-BR.json');
		expect((await setUserPreferences(api, { language: 'pt-BR' })).status()).toBe(200);
		await response;
		await expect(page.locator('h2')).toHaveText('Bem-vindo ao Agents Labs Chat PRO');

		// Test if selected language remaing after refresh
		await page.goto('/home');
		await expect(page.locator('h2')).toHaveText('Bem-vindo ao Agents Labs Chat PRO');

		expect((await setUserPreferences(api, { language: '' })).status()).toBe(200);
	});

	test.describe('Browser', async () => {
		test.use({ locale: 'pt-BR' });
		test("expect to display text in the browser's language", async ({ page }) => {
			await page.goto('/home');
			await expect(page.locator('h2')).toHaveText('Bem-vindo ao Agents Labs Chat PRO');
		});
	});
});
