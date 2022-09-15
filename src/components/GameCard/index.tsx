import {
  TouchableOpacity,
  ImageBackground,
  TouchableOpacityProps,
  Text,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles';
import { THEME } from '../../theme';

export interface GameCardProps {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

interface Props extends TouchableOpacityProps {
  data: GameCardProps;
}

export const GameCard = ({ data, ...rest }: Props) => {
  return (
    <TouchableOpacity style={styles.container} {...rest} activeOpacity={0.6}>
      <ImageBackground style={styles.cover} source={{ uri: data.bannerUrl }}>
        <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
          <Text style={styles.name}>{data.title}</Text>
          <Text style={styles.ads}>{data._count.ads} anúncio(s)</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};
