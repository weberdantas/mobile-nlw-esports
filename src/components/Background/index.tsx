import { ImageBackground, StatusBar } from 'react-native';

import backgroundImg from '../../assets/background-galaxy.png'

import { styles } from './styles';

interface Props {
  children: React.ReactNode;
}

export const Background = ({ children }: Props) => {
  return (
    <ImageBackground source={backgroundImg} style={styles.container} defaultSource={backgroundImg}>
        <StatusBar animated barStyle='light-content' backgroundColor='transparent' />
        {children}
    </ImageBackground>
  );
};
