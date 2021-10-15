import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, Title } from './styles';

type ButtonProps = TouchableOpacityProps & {
  title: string;
};

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <Container {...rest} activeOpacity={0.7}>
      <Title>{title}</Title>
    </Container>
  );
}