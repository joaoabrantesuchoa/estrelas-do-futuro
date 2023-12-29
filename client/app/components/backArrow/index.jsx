
import backArrow from '../../../imgs/ArrowLeft.png'
import { styles } from './styles'
import { View, ImageBackground, Text } from 'react-native'

function BackArrow({ navigation }) {
    return (
        <View style={styles.backContainer}>
            <ImageBackground href={navigation} style={styles.backArrow} source={backArrow} />
            <Text style={styles.text}>Voltar</Text>
        </View>
    );
}

export default BackArrow