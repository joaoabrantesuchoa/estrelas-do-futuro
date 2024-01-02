import React from "react";
import { View } from "react-native";
import Button from "../../../components/button";

function List({ studentId, studentName }) {
  return (
    <View>
      <Button
        name={`${studentName}`}
        navigation={`/studentView/${studentId}`}
      />
    </View>
  );
}

export default List;
