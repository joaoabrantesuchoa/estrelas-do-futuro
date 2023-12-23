import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios'

function StudentList() {
    const [estudantes, setEstudantes] = useState([]);

    useEffect(() => {
        const fetchEstudantes = async () => {
            try {
                const response = await axios.get('http://localhost:5555/students');
                setEstudantes(response.data);
            } catch (error) {
                console.error('Erro ao buscar estudantes:', error);
            }
        };

        fetchEstudantes();
    }, []);

    const renderItem = ({ item }) => (
        <View>
            <Text>{item.name}</Text>
            <Text>{item.birthDate}</Text>
            <Text>{item.motherName}</Text>
            <Text>{item.fatherName}</Text>
            <Text>{item.phone}</Text>
            <Text>{item.responsablePhone}</Text>
            <Text>{item.medicalObservations}</Text>
            <Text>{item.position}</Text>
        </View>
    );

    return (
        <View>
            <FlatList
                data={estudantes}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
        </View>
    );
}

export default StudentList;