import { StatusBar } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter';

import { Routes } from './src/routes'
import { Background, Loading } from './src/components';

export default function App() {
  const [isLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  })

  return (
    <Background>
      <StatusBar
        animated
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {isLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}
