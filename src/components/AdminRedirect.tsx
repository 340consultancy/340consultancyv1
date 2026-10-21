import { useEffect, type FC } from 'react';
import { Navigate } from 'react-router-dom';

/**
 * /admin → the Sanity Studio where the site content is edited
 * (VITE_SANITY_STUDIO_URL). Without a configured Studio the route falls back
 * to the home page.
 */
const AdminRedirect: FC<{ go?: (url: string) => void }> = ({ go = (url) => window.location.replace(url) }) => {
  const studioUrl = (import.meta.env.VITE_SANITY_STUDIO_URL as string | undefined)?.replace(/\/+$/, '');
  useEffect(() => {
    if (studioUrl) go(studioUrl);
  }, [studioUrl, go]);
  if (!studioUrl) return <Navigate to="/" replace />;
  return null; // blank for the split second until the browser navigates
};

export default AdminRedirect;
