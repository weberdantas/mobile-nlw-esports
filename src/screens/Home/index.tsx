import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { Heading, GameCard, GameCardProps, Background } from '../../components';

import { styles } from './styles';

import logoImg from '../../assets/logo-nlw-esports.png';

export const Home = () => {
  const [games, setGames] = useState<GameCardProps[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    onGetGames();
  }, []);

  const onGetGames = () => {
    fetch('http://192.168.1.5:3333/games')
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      });
  };

  const renderItem = ({ item }: { item: GameCardProps }) => {
    return <GameCard data={item} onPress={() => handleOpenGame(item)} />;
  };

  const handleOpenGame = (item: GameCardProps) =>
    navigation.navigate('game', {
      id: item.id,
      title: item.title,
      bannerUrl: item.bannerUrl,
    });

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
};
