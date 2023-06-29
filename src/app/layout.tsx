import { ReactNode } from 'react';
import './globals.css';

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => (
  <html className='h-screen'>
    <body className='h-full'>
      {children}
    </body>
  </html>
);

export default Layout;
