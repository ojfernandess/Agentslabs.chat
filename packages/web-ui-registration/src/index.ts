import CMSPage from './CMSPage';
import RegistrationPageRouter from './RegistrationPageRouter';
import ResetPasswordPage from './ResetPassword/ResetPasswordPage';

export type { LoginRoutes } from './hooks/useLoginRouter';
export { CMSPage, ResetPasswordPage };
export { DEFAULT_BRAND_LOGO_ALT, DEFAULT_BRAND_LOGO_PATH, DEFAULT_SITE_NAME, RegistrationBrandLogo } from './brand';

export default RegistrationPageRouter;
