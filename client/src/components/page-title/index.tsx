import { Helmet } from 'react-helmet';

const PageTitle = ({ title = 'Facebook' }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
    </Helmet>
  );
};

export default PageTitle;
