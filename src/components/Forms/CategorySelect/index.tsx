import React from 'react';
import { Container, Category, Icon } from './styles';

type CategorySelectProps = {
  title: string;
};

export function CategorySelect({ title }: CategorySelectProps) {
  return (
    <Container>
      <Category>{title}</Category>

      <Icon name='chevron-down' />
    </Container>
  );
}
