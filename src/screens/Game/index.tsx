import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import { Background, Heading } from '../../components';
import { GameParams } from '../../@types/navigation';
import { THEME } from '../../theme';

import { styles } from './styles';

import logoImg from '../../assets/logo-nlw-esports.png';

export const Game = () => {
  const route = useRoute();
  const game = route.params as GameParams;

  const navigation = useNavigation();

  const handleGoBack = () => navigation.goBack();

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} resizeMode='cover' />
          <View style={styles.space} />
        </View>

        <Image source={{ uri: game.bannerUrl }} style={styles.cover} />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar" />
      </SafeAreaView>
    </Background>
  );
};
