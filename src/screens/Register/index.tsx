import React, { useState } from 'react';
import { Modal } from 'react-native';
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { Input } from '../../components/Form/Input';
import { TransactionTypeButton } from '../../components/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles';

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  function handleTransactionsTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleOpenModalCategorySelect() {
    setCategoryModalOpen(true);
  }

  function handleCloseModalCategorySelect() {
    setCategoryModalOpen(false);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder='Nome' />
          <Input placeholder='Preço' />

          <TransactionsTypes>
            <TransactionTypeButton
              onPress={() => handleTransactionsTypeSelect('up')}
              title='Income'
              type='up'
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton
              onPress={() => handleTransactionsTypeSelect('down')}
              title='Outcome'
              type='down'
              isActive={transactionType === 'down'}
            />
          </TransactionsTypes>

          <CategorySelectButton
            title={category.name}
            onPress={handleOpenModalCategorySelect}
          />
        </Fields>

        <Button title='Enviar' />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseModalCategorySelect}
        />
      </Modal>
    </Container>
  );
}
