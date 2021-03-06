import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Container, Icon, Title, Button } from './styles';

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
};

type TransactionTypeButtonProps = RectButtonProps & {
  title: string;
  type: 'up' | 'down';
  isActive: boolean;
};

export function TransactionTypeButton({
  type,
  title,
  isActive,
  ...rest
}: TransactionTypeButtonProps) {
  return (
    <Container type={type} isActive={isActive}>
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
}
