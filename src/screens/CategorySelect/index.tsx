import React from 'react';
import { FlatList } from 'react-native';
import { Button } from '../../components/Form/Button';
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
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
};

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: CategorySelectProps) {
  function handleCatgorySelect(item: Category) {
    setCategory(item);
  }

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
          <Category
            onPress={() => setCategory(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Diviver />}
      />

      <Footer>
        <Button title='Select' onPress={closeSelectCategory} />
      </Footer>
    </Container>
  );
}
