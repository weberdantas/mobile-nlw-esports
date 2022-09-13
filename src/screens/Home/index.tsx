import { View, Image, FlatList } from 'react-native';

import { Heading, GameCard, GameCardProps } from '../../components';
import { GAMES } from '../../utils/games';

import { styles } from './styles';

import logoImg from '../../assets/logo-nlw-esports.png';

export const Home = () => {
  const renderItem = ({ item }: { item: GameCardProps }) => {
    return <GameCard data={item} />;
  };

  return (
    <View style={styles.container}>
      <Image source={logoImg} style={styles.logo} />
      <Heading
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      />

      <FlatList
        data={GAMES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
      />
    </View>
  );
};
