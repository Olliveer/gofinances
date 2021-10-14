import React from 'react';
import { FlatList } from 'react-native';
import { Button } from '../../components/Forms/Button';
import { categories } from '../../utils/categories';
import {
  Category,
  Container,
  Diviver,
  Footer,
  Header,
  Icon,
  Name,
  Title,
} from './styles';

type Category = {
  key: string;
  name: string;
};

type CategorySelectProps = {
  category: string;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
};

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: CategorySelectProps) {
  return (
    <Container>
      <Header>
        <Title>Category</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category>
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Diviver />}
      />

      <Footer>
        <Button title='Select' />
      </Footer>
    </Container>
  );
}
