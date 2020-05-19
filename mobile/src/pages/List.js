import React, {useState, useEffect, useReducer} from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Image, AsyncStorage } from 'react-native';

import logo from '../assets/logo.png';

import SpotList from '../components/SpotList';

export default function List() {
  const [techs, setTechs] = useState([]);

  

  useEffect( () => {
    AsyncStorage.getItem('techs').then( storageTechs => {
      const techsArr = storageTechs.split(',').map(tech => tech.trim());

      setTechs(techsArr);

    })
  }, [] )

  return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={logo}/>

        <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech} /> )}
        </ScrollView>
        
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'#00bd80'
},

  logo:{
    height:35,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop:20,
  }


})