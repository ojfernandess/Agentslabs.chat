import { VerticalWizardLayout, VerticalWizardLayoutTitle, VerticalWizardLayoutFooter } from '@rocket.chat/layout';
import { useSetting, useAssetWithDarkModePath } from '@rocket.chat/ui-contexts';
import type { ReactElement, ReactNode } from 'react';

import { RegistrationBrandLogo } from '../brand';
import LoginPoweredBy from '../components/LoginPoweredBy';
import LoginSwitchLanguageFooter from '../components/LoginSwitchLanguageFooter';
import LoginTerms from '../components/LoginTerms';
import { RegisterTitle } from '../components/RegisterTitle';

const VerticalTemplate = ({ children }: { children: ReactNode }): ReactElement => {
	const hideLogo = useSetting('Layout_Login_Hide_Logo', false);
	const customLogo = useAssetWithDarkModePath('logo');
	const customBackground = useAssetWithDarkModePath('background');

	return (
		<VerticalWizardLayout background={customBackground} logo={<RegistrationBrandLogo hideLogo={hideLogo} src={customLogo} />}>
			<VerticalWizardLayoutTitle>
				<RegisterTitle />
			</VerticalWizardLayoutTitle>
			<LoginPoweredBy />
			{children}
			<VerticalWizardLayoutFooter>
				<LoginTerms />
				<LoginSwitchLanguageFooter />
			</VerticalWizardLayoutFooter>
		</VerticalWizardLayout>
	);
};

export default VerticalTemplate;
