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

export function SignIn() {
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
          <SignInSocialButton title="Entrar com o Google" svg={GoogleSvg} />
          <SignInSocialButton title="Entrar com a Apple" svg={AppleSvg} />
        </FooterWarpper>
      </Footer>
    </Container>
  );
}