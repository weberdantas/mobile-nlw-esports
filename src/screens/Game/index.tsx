import { useEffect, useState } from 'react';
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import {
  Background,
  Heading,
  DuoCard,
  DuoCardProps,
  DuoMatch,
} from '../../components';
import { GameParams } from '../../@types/navigation';
import { THEME } from '../../theme';

import { styles } from './styles';

import logoImg from '../../assets/logo-nlw-esports.png';

export const Game = () => {
  const [ads, setAds] = useState<DuoCardProps[]>([]);
  const [discordAdSelected, setDiscordAdSelected] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  useEffect(() => {
    onGetAds();
  }, []);

  const onGetAds = () => {
    fetch(`http://192.168.1.5:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => {
        setAds(data);
      });
  };

  const onGetDiscordUser = (adsId: string) => {
    fetch(`http://192.168.1.5:3333/ads/${adsId}/discord`)
      .then((response) => response.json())
      .then((data) => {
        setDiscordAdSelected(data.discord || '');
      });
  };

  const renderEmptyList = () => (
    <Text style={styles.emptyListText}>
      Ainda não há anúncios para este jogo.
    </Text>
  );

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

          <Image source={logoImg} style={styles.logo} resizeMode="cover" />
          <View style={styles.space} />
        </View>

        <Image source={{ uri: game.bannerUrl }} style={styles.cover} />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar" />

        <FlatList
          data={ads}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => onGetDiscordUser(item.id)} />
          )}
          ListEmptyComponent={renderEmptyList}
          keyExtractor={(item) => item.id}
          contentContainerStyle={
            ads.length ? styles.contentList : styles.emptyListContent
          }
          style={styles.containerList}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <DuoMatch
          visible={discordAdSelected.length > 0}
          discord={discordAdSelected}
          onClose={() => setDiscordAdSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
};
