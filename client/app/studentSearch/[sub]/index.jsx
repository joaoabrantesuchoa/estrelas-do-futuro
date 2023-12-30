import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { fetchStudents } from '../../../api';
import { useLocalSearchParams } from 'expo-router';
import BackArrow from '../../components/backArrow';
import Button from '../../components/button';
import { styles } from './styles'
import InputTextField from '../../components/inputTextField';
import StudentIcon from './components/studentIcon';


function StudentList() {
    const { sub } = useLocalSearchParams();

    const [studentsData, setStudentsData] = useState([]);

    const fetchStudentsData = useCallback(async () => {
        const data = await fetchStudents();
        setStudentsData(data)
    }, []);


    useEffect(() => {
        fetchStudentsData();
    }, [fetchStudentsData]);

    const renderItem = ({ item }) => (
        <View>
            <StudentIcon studentName={item.name} studentId={item.id} studentImage={item.image} />
        </View>
    );

    return (
        <View >
            <BackArrow navigation={'/studentCategory'} />

            <View style={styles.mainContainer}>
                <InputTextField placeholder={'Pesquise o aluno pelo nome'} />

                <FlatList
                    data={studentsData}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                />

                <Button navigation={'/createStudent'} name={'Adicionar aluno'} />
            </View>

        </View>
    );
}

export default StudentList;