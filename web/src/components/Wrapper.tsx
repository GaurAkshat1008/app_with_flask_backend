import { Flex } from '@chakra-ui/react';
import React from 'react'

export type WrapperVariant =  'small' | 'regular' | 'large'

interface WrapperProps {
  children?: React.ReactNode
  variant?: WrapperVariant
}

export const Wrapper: React.FC<WrapperProps> = ({ children, variant = 'regular' }) => {
    return (
        <Flex
            flexDirection="column"
            justifyContent="center"
            // alignItems='center'
            mt={8}
            w="100%"
            maxW={variant === 'regular'? '800px' : variant==='large' ? '80%' : '400px'}
            mx="auto">
            {children}
        </Flex>
    );
}