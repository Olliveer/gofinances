import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { Input } from '../../components/Form/Input';
import { InputForm } from '../../components/Form/InputForm';
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

type FormData = {
  name: string;
  amount: string;
};

const schema = Yup.object().shape({
  name: Yup.string().required(),
  amount: Yup.number().typeError('Inform numeric value').positive().required(),
});

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
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

  function handleRegister(form: FormData) {
    if (!transactionType) {
      return Alert.alert('Select transaction type');
    }

    if (category.key === 'category') {
      return Alert.alert('Select category');
    }

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name='name'
              control={control}
              placeholder='Nome'
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />

            <InputForm
              name='amount'
              keyboardType='numeric'
              control={control}
              placeholder='Preço'
              error={errors.amount && errors.amount.message}
            />

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

          <Button title='Enviar' onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseModalCategorySelect}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
