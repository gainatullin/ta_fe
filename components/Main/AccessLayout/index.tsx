import React, { useEffect, useState } from 'react';

interface IProps {
  children: any;
}

const AccessLayout = ({ children }: IProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, [isClient]);

  return children;
};

export default AccessLayout;
