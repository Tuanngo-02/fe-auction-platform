import { useCallback } from 'react';

import { useUser } from '@/lib/auth';

// Khớp AuthoritiesConstants bên backend
export const ROLES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER',
};

export const useAuthorization = () => {
  const user = useUser();

  const checkAccess = useCallback(
    ({ allowedRoles }) => {
      if (!allowedRoles?.length) return true;
      const authorities = user.data?.authorities || [];
      return allowedRoles.some((role) => authorities.includes(role));
    },
    [user.data],
  );

  return { checkAccess, authorities: user.data?.authorities || [] };
};

export const Authorization = ({
  allowedRoles,
  policyCheck,
  forbiddenFallback = null,
  children,
}) => {
  const { checkAccess } = useAuthorization();
  let canAccess = false;

  if (allowedRoles) canAccess = checkAccess({ allowedRoles });
  if (typeof policyCheck !== 'undefined') canAccess = policyCheck;

  return <>{canAccess ? children : forbiddenFallback}</>;
};
