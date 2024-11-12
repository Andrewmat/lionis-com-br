import { Outlet } from '@remix-run/react';
import { Layout } from '~/components/main-layout';

export default function ChirpRoute() {
  return (
    <Layout>
      <article className="full-bleed-wrapper gap-y-2 leading-7">
        <Outlet />
      </article>
    </Layout>
  );
}
