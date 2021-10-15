import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Container, Title } from './styles';

// onPress dont accept type void  -> var onPress: ((pointerInside: boolean) => void) & (() => void)
type ButtonProps = RectButtonProps & {
  title: string;
  onSubmit: () => void;
};

export function Button({ title, onSubmit, ...rest }: ButtonProps) {
  return (
    <Container onPress={onSubmit} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
