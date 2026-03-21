import { License } from '@rocket.chat/core-services';
import type { Context, Next } from 'hono';
import { createMiddleware } from 'hono/factory';

export const isLicenseEnabledMiddleware = createMiddleware(async (c: Context, next: Next) => {
	if (!(await License.hasModule('federation'))) {
		return c.json({ error: 'Federation is not enabled' }, 403);
	}
	return next();
});
