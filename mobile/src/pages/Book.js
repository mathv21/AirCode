import React, {useState} from 'react';
import { SafeAreaView, Alert ,Text, TextInput, TouchableOpacity, AsyncStorage, StyleSheet } from 'react-native';

import api from '../services/api'

export default function Book({navigation}) {
  const [date, setDate] = useState('');

  const id = navigation.getParam('id');

 async function handleSubmit(){
    const user_id = await AsyncStorage.getItem('user');

    await api.post(`/spots/${id}/bookings`, {
      date
    },{
      headers: {user_id}
    })

      Alert.alert('Solitação de Reserva Enviada')

      navigation.navigate('List');
  }

  function handleCancel(){
    navigation.navigate('List');
  }

  return (
    <SafeAreaView style={styles.container}> 
       <Text style={styles.label}>Data de Interesse *</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Data de Reserva"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
                />

            <TouchableOpacity  onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar Reserva</Text>
            </TouchableOpacity> 

            <TouchableOpacity  onPress={handleCancel} style={styles.buttonCancel}>
                <Text style={styles.cancelText}>Cancelar Reserva</Text>
            </TouchableOpacity> 

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container:{
    margin:30,
    marginTop:80,
  },
  
  label:{
    fontWeight: 'bold',
    color:'#444',
    marginBottom:8,
},

input:{
    borderWidth:1,
    borderColor:"#ddd",
    paddingHorizontal:20,
    fontSize:16,
    color: "#444",
    height:44,
    marginBottom:20,
    borderRadius:10,
},
button:{
    height: 42,
    backgroundColor:'#f01b50',
    justifyContent:"center",
    alignItems:"center",
    borderRadius:10,
},
buttonText:{
    color:"#FFF",
    fontWeight:"bold",
    fontSize:16,
},

buttonCancel:{
height: 42,
 backgroundColor:'#ccc',
 justifyContent:"center",
 alignItems:"center",
 borderRadius:10,
 marginTop:10,
},

cancelText:{
  color:"#FFF",
  fontWeight:"bold",
  fontSize:16,
},


})
