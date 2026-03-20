import { VerticalWizardLayout } from '@rocket.chat/layout';
import { RegistrationBrandLogo } from '@rocket.chat/web-ui-registration';
import { useAssetWithDarkModePath, useSetting } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';

type LayoutProps = {
	children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	const hideLogo = useSetting('Layout_Login_Hide_Logo', false);
	const customLogo = useAssetWithDarkModePath('logo');
	const customBackground = useAssetWithDarkModePath('background');

	return (
		<VerticalWizardLayout
			background={customBackground}
			logo={<RegistrationBrandLogo hideLogo={hideLogo} src={customLogo} variant='oauth' />}
		>
			{children}
		</VerticalWizardLayout>
	);
};

export default Layout;
