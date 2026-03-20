import { Box } from '@rocket.chat/fuselage';
import { useSetting } from '@rocket.chat/ui-contexts';
import type { ReactElement } from 'react';

import { DEFAULT_SITE_NAME } from '../brand';

export const LoginPoweredBy = (): ReactElement | null => {
	const hidePoweredBy = useSetting('Layout_Login_Hide_Powered_By', false);
	if (hidePoweredBy) {
		return null;
	}
	return (
		<Box mbe={18} fontScale='p2' color='annotation'>
			{DEFAULT_SITE_NAME}
		</Box>
	);
};

export default LoginPoweredBy;
