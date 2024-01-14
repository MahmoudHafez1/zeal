import { Heading, HStack, Spinner } from "native-base";
import React from "react";

export const Loading: React.FC = () => {
  return (
    <HStack
      space={2}
      justifyContent='center'
      alignItems='center'
      h='100%'
      w='100%'
    >
      <Spinner accessibilityLabel='Loading posts' />
      <Heading color='primary.400' fontSize='md'>
        Loading
      </Heading>
    </HStack>
  );
};