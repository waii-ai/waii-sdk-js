import React from 'react';
import { Redirect } from '@docusaurus/router';

function Home() {
  return <Redirect to="/docs/api-doc" />;
}

export default Home;
