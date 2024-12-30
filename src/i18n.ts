import {getRequestConfig} from 'next-intl/server';
import {locales} from './config/languages';

export default getRequestConfig(async ({locale}) => {
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    timeZone: 'UTC'
  };
}); 