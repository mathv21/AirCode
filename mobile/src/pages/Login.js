import React, {useState, useEffect} from 'react';
import { View, AsyncStorage ,KeyboardAvoidingView, Platform, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../services/api'

import logo from '../assets/logo.png';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');
    
    useEffect( () => {
        AsyncStorage.getItem('user').then(user => {
            if(user){
                navigation.navigate('List');
            }
        })
    }, [])


    async function handleSubmit(){
        const response = await api.post('/sessions', {
            email
        })

        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        navigation.navigate('List');

    }

  return (
    <KeyboardAvoidingView  enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
        <Image source={logo}/>
     <View style={styles.box}> 
        <View style={styles.form}>
            <Text style={styles.label}>Seu E-mail *</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Seu e-mail"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                />
                
            <Text style={styles.label}>Tecnologias *</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Suas Tecnologias"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={techs}
                onChangeText={setTechs}
                />
            
            <TouchableOpacity  onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Realizar Busca</Text>
            </TouchableOpacity>
        </View> 
    </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'#00bd80'
    },

    box:{
        width: 100 * 3.4,
        height: 100 * 3,
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'#e4f9f2',
        marginTop:30,
        borderRadius:10
    },

    form:{
        alignSelf:'stretch',
        paddingHorizontal:30,
        marginTop: 38,
    },

    label:{
        fontWeight: 'bold',
        color:'#444',
        marginBottom:8,
    },
   
    input:{
        borderWidth:1,
        borderColor:"#333",
        paddingHorizontal:20,
        fontSize:16,
        color: "#444",
        height:44,
        marginBottom:20,
        borderRadius:10,
    },
    button:{
        width: 100 *2.7,
        height:42 ,
        backgroundColor:"#f01b50",
        justifyContent: "center",
        alignItems:"center",
        marginTop:20,
        borderRadius:9,

    },
    buttonText:{
        color:"#FFF",
        fontWeight:"bold",
        fontSize:16,
    }

})
