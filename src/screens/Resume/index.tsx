import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { VictoryPie } from 'victory-native';
import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';
import { ChartContainer, Container, Content, Header, Title } from './styles';

type TransactionProps = {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
};

type CatgoryData = {
  key: string;
  name: string;
  total: string;
  totalFormatted: string;
  percent: string;
  color: string;
};

export function Resume() {
  const theme = useTheme();
  const [totalByCategories, setTotalByCategories] = useState<CatgoryData[]>([]);

  async function loadData() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);

    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (expensive: TransactionProps) => expensive.type === 'negative'
    );

    const expensiveTotal = expensives.reduce(
      (acumullator: number, expensive: TransactionProps) => {
        return acumullator + Number(expensive.amount);
      },
      0
    );

    const totalByCatgory: CatgoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionProps) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const percent = `${((categorySum / expensiveTotal) * 100).toFixed(0)}%`;

        totalByCatgory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          totalFormatted,
          percent,
          color: category.color,
        });
      }
    });

    setTotalByCategories(totalByCatgory);
  }

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <ChartContainer>
        <VictoryPie
          data={totalByCategories}
          x='percent'
          y='total'
          colorScale={totalByCategories.map((category) => category.color)}
          style={{
            labels: {
              fontSize: RFValue(18),
              fontWeight: 'bold',
              fill: theme.colors.shape,
            },
          }}
          animate={{
            duration: 2000,
          }}
          height={RFValue(300)}
          labelRadius={50}
        />
      </ChartContainer>

      <Content>
        {totalByCategories.map((item) => (
          <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.totalFormatted}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  );
}
