import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <div className='h-screen flex justify-center items-center p-10 rounded-md'>{children}</div>;
};

export default AuthLayout;
