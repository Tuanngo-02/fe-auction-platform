import { env } from '@/config/env';

// React 19 tự đưa <title>/<meta> lên <head>
export const Head = ({ title = '', description = '' }) => {
  const fullTitle = title ? `${title} | ${env.APP_NAME}` : env.APP_NAME;
  return (
    <>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
    </>
  );
};
