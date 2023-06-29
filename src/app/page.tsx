import Flow from '@/components/flow';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Chat Flow',
};

const Home = () => (<Flow />);

export default Home;
