import { View, Image } from "react-native";
import Button from "../../../../components/button";
import { styles } from "./styles";


function StudentIcon({ studentName, studentId, studentImage }) {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: studentImage }}
                style={styles.image}
            />
            <Button name={`${studentName}`} navigation={`/studentView/${studentId}`} />
        </View>
    );
}

export default StudentIcon