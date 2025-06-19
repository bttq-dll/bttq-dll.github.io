import { Text, TextProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

export const GradientText = ({ children, ...props }: { children: ReactNode } & TextProps) => (
  <Text
    as="span"
    bgGradient="linear(to-b, #0dc3fa, #ffffff)"
    bgClip="text"
    fontWeight="bold"
    display="inline"
    {...props}
  >
    {children}
  </Text>
);