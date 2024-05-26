import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getStudentEvaluation,
  getStudentPhoto,
  setStudentEvaluation,
} from "../../../../../api";
import Icon from "../../../../../components/icon";
import Add from "../../../../../assets/images/Add.png";
import { styles } from "./styles";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

function StudentEvaluation() {
  const { studentId } = useLocalSearchParams();
  const [evaluation, setEvaluation] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const fetchPhoto = useCallback(async () => {
    const studentPhoto = await getStudentPhoto(studentId);
    if (studentPhoto) {
      setProfileImage(`data:image/jpeg;base64,${studentPhoto}`);
    }
  }, [studentId, setProfileImage]);

  const fetchEvaluation = useCallback(async () => {
    const studentEvaluation = await getStudentEvaluation(studentId);
    if (studentEvaluation) {
      setEvaluation(`data:image/jpeg;base64,${studentEvaluation}`);
    }
  }, [studentId, setEvaluation]);

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!response.canceled) {
        try {
          await setStudentEvaluation(studentId, response.assets[0].uri);
          await fetchEvaluation();
        } catch (error) {
          console.log(error.message);
        }
      }
    }
  };

  const saveImageToGallery = async (uri) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Precisamos de permissão para salvar a imagem na galeria.");
        return;
      }

      if (!uri) {
        alert(
          "Você não inseriu a ficha de avaliação para que ela possa ser baixada"
        );
        return;
      }

      const base64Data = uri.split(",")[1];
      if (!base64Data) {
        alert(
          "Os dados da imagem estão faltando ou não estão em formato base64 correto."
        );
        return;
      }

      const fileUri = FileSystem.cacheDirectory + "tempImage.jpg";
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
      alert("Imagem salva com sucesso na galeria.");
    } catch (error) {
      alert("Ocorreu um erro ao salvar a imagem: " + error.message);
    }
  };

  useEffect(() => {
    fetchPhoto();
  }, [fetchPhoto]);

  useEffect(() => {
    fetchEvaluation();
  }, [fetchEvaluation]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Icon key={studentId} studentImage={profileImage} />

        <View>
          <Image
            style={styles.imageContainer}
            source={evaluation ? { uri: evaluation } : Add}
          />
          <Text style={styles.imageText} onPress={openImageLibrary}>
            Editar ficha de avaliação
          </Text>

          <Text
            style={styles.imageText}
            onPress={() => saveImageToGallery(evaluation)}
          >
            Baixar ficha de avaliação
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default StudentEvaluation;
