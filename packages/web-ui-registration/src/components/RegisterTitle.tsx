import { useSetting } from '@rocket.chat/ui-contexts';
import type { ReactElement } from 'react';
import { Trans } from 'react-i18next';

import { DEFAULT_SITE_NAME } from '../brand';

export const RegisterTitle = (): ReactElement | null => {
	const siteName = useSetting('Site_Name', DEFAULT_SITE_NAME);
	const hideTitle = useSetting('Layout_Login_Hide_Title', false);

	if (hideTitle) {
		return null;
	}

	return (
		<span id='welcomeTitle'>
			<Trans i18nKey='registration.component.welcome'>Welcome to {siteName} workspace</Trans>
		</span>
	);
};
