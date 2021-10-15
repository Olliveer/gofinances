import { Feather } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

type CategoryProps = {
  isActive: boolean;
};

const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;

  background-color: ${({ theme }) => theme.colors.primary};

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

const Category = styled.TouchableOpacity<CategoryProps>`
  width: 100%;
  padding: ${RFValue(15)}px;

  flex-direction: row;
  align-items: center;

  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.secondary_light : theme.colors.background};
`;

const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: 16px;
`;

const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

const Diviver = styled.View`
  height: 1px;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.text};
`;

const Footer = styled.View`
  width: 100%;
  padding: 24px;
`;

export { Container, Header, Title, Category, Icon, Name, Diviver, Footer };
