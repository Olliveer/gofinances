import React from 'react';
import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWarpper,
} from './styles';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { useAuth } from '../../hooks/useAuth';
import { Alert } from 'react-native';

export function SignIn() {
  const { sigInWithGoogle, sigInWithApple } = useAuth();

  async function handleSigInWithGoogle() {
    try {
      await sigInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Erro ao realizar o login');
    }
  }

  async function handleSigInWithApple() {
    try {
      await sigInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Erro ao realizar o login');
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
          <SignInSocialButton
            onPress={handleSigInWithApple}
            title="Entrar com a Apple"
            svg={AppleSvg}
          />
        </FooterWarpper>
      </Footer>
    </Container>
  );
}
