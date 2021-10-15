import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

const Container = styled.View`
  width: 100%;
`;

const Error = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.attention};

  margin: 7px;
`;

export { Container, Error };
