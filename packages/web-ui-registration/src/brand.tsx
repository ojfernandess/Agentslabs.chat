import { Box } from '@rocket.chat/fuselage';
import type { ReactElement } from 'react';

export const DEFAULT_BRAND_LOGO_PATH = '/images/agentslabslogo.png';
export const DEFAULT_BRAND_LOGO_ALT = 'Agents Labs Chat PRO';
export const DEFAULT_SITE_NAME = 'Agents Labs Chat PRO';

type RegistrationBrandLogoProps = {
	hideLogo: boolean;
	src?: string;
	variant?: 'registration' | 'oauth';
};

export const RegistrationBrandLogo = ({ hideLogo, src, variant = 'registration' }: RegistrationBrandLogoProps): ReactElement => {
	if (hideLogo) {
		return <></>;
	}

	const logoSrc = src ?? DEFAULT_BRAND_LOGO_PATH;

	if (variant === 'oauth') {
		return <Box is='img' maxHeight={40} mi={-8} src={logoSrc} alt={DEFAULT_BRAND_LOGO_ALT} />;
	}

	return <Box is='img' maxHeight='x40' mi='neg-x8' src={logoSrc} alt={DEFAULT_BRAND_LOGO_ALT} />;
};
