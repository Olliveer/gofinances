import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/useAuth';
import {
  Container,
  Footer,
  FooterWarpper,
  Header,
  SignInTitle,
  Title,
  TitleWrapper,
} from './styles';

export function SignIn() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { sigInWithGoogle, sigInWithApple } = useAuth();

  async function handleSigInWithGoogle() {
    try {
      setIsLoading(true);
      sigInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Erro ao realizar o login');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSigInWithApple() {
    try {
      setIsLoading(true);
      sigInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Erro ao realizar o login');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas {'\n'} finanças de forma {'\n'} muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>Faça seu login com uma das contas abaixo</SignInTitle>
      </Header>

      <Footer>
        <FooterWarpper>
          <SignInSocialButton
            onPress={handleSigInWithGoogle}
            title="Entrar com o Google"
            svg={GoogleSvg}
          />
          {Platform.OS === 'ios' && (
            <SignInSocialButton
              onPress={handleSigInWithApple}
              title="Entrar com a Apple"
              svg={AppleSvg}
            />
          )}
        </FooterWarpper>

        {isLoading && (
          <ActivityIndicator
            color={theme.colors.shape}
            style={{ marginTop: 18 }}
          />
        )}
      </Footer>
    </Container>
  );
}
