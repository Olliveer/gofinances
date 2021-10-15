import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import uuid from 'react-native-uuid';
import * as Yup from 'yup';
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { InputForm } from '../../components/Form/InputForm';
import { TransactionTypeButton } from '../../components/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
import {
  Container,
  Fields,
  Form,
  Header,
  Title,
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
  const navigation = useNavigation();
  const dataKey = '@gofinances:transactions';
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
    reset,
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

  async function handleRegister(form: FormData) {
    if (!transactionType) {
      return Alert.alert('Select transaction type');
    }

    if (category.key === 'category') {
      return Alert.alert('Select category');
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
    } catch (error) {
      console.log(error);
      Alert.alert('its not possible to save, try again');
    } finally {
      setCategory({
        key: 'category',
        name: 'Categoria',
      });
      setTransactionType('');
      reset();
      navigation.navigate('List');
    }
  }

  useEffect(() => {
    async function laodData() {
      // await AsyncStorage.removeItem(dataKey);
      const data = await AsyncStorage.getItem(dataKey);
      console.log(JSON.parse(data!));
    }

    laodData();
  }, []);

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

          <Button title='Enviar' onSubmit={handleSubmit(handleRegister)} />
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
