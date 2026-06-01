import { Heading } from '@chakra-ui/react';
import './Header.module.css';

export const Header = () => {
  return (
    <header>
      <Heading as="h1" size="lg" color="brand.900" textAlign="center" py="4">
        Bem-vindo ao Bené Bank
      </Heading>
    </header>
  );
};