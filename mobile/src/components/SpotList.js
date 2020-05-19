import React, {useEffect, useState} from 'react';
import { withNavigation}   from  'react-navigation'
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';

import api from '../services/api';

function SpotList({ tech, navigation }) {

    const [ spots, setSpots ] = useState([]);


    useEffect(() => {
        async function loadSpots(){
            const response = await api.get('/spots', {
                params: { tech } 
            })

            setSpots(response.data);
        }

        loadSpots()
    }, [])


    function handleNavigate(id){
        navigation.navigate('Book', { id });
    }
  
    return (
    <View style={styles.box}>
        <View style={styles.container}>

            <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text> </Text>
          
            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={spotItem => spotItem._id }
                horizontal
                showsHorizontalScrollIndicator={true}
                renderItem={({ item }) => (
                    <View style={styles.listItem}> 
                        <Image  style={styles.thumb} source={{ uri: item.thumb_url}} />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R${item.price}/Dia` : 'GRATUITO'}</Text>
                        <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
                            <Text style={styles.buttonText}> Soliticar Reserva </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    
    container:{
        marginTop:30,
    },

    box:{
        height: 100 * 3.3,
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'#e4f9f2',
        marginTop:30,
        borderRadius:8
    },

    title:{
        fontSize:20,
        color:"#444",
        paddingHorizontal:10,
        marginBottom: 15,
    },
    
    bold:{
        fontWeight: "bold",
    },

    list:{
        paddingHorizontal:18,
    },

    listItem:{
        marginRight:25,   
    },

    thumb:{
        width:200,
        height:120,
        resizeMode:'cover',
    },

    company:{
        fontSize:23,
        fontWeight: 'bold',
        color:'#333',
        marginTop:10,
    },

    price:{
        fontSize:15,
        color:"#999",
        marginTop: 5
    },

    button:{
        height:34 ,
        backgroundColor:"#f01b50",
        justifyContent: "center",
        alignItems:"center",
        marginTop:15,
        borderRadius:9,
    },

    buttonText:{
        color:"#FFF",
        fontWeight:"bold",
        fontSize:15,
    }

})

export default withNavigation(SpotList);