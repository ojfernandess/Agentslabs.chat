import { License } from '@rocket.chat/core-services';
import { createMiddleware } from 'hono/dist/cjs/helper/factory/index.js';

export const isLicenseEnabledMiddleware = createMiddleware(async (c, next) => {
	if (!(await License.hasModule('federation'))) {
		return c.json({ error: 'Federation is not enabled' }, 403);
	}
	return next();
});
