import axios from "axios";
import React, { useEffect, useState } from "react"
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { config } from "../../../config";
import { CustomColors } from "../../styles/color";
import { create } from "react-test-renderer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Preference from "./Preference";
import PreferencePlaces from "./PreferencePlaces";
import VolunteerAbout from "./VolunteerAbout";


export default VolunteerProfile = () =>{        
    return(
        <LinearGradient style={styles.bigContainer}
           colors={ ['black','#214ae2', '#4752e2','#8962f3']}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{marginBottom:15}}>
                    <Text style={styles.headers}>Hobbies</Text>
                    <Preference/>
                </View>

                <View>
                    <Text style={styles.headers}>Places</Text>
                    <PreferencePlaces/>
                </View>
                
                <View>
                    <VolunteerAbout/>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    bigContainer:{
        flex:1,
        paddingTop:40,
        paddingHorizontal:20,
        paddingBottom:40
    },
    headers:{
        color:CustomColors.white,
        fontSize: 18,
        fontWeight:'500',
        marginBottom: 10
    },
    rowCenter:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    shadowContainer: {
        shadowColor: '#fff', 
        shadowOffset: {
          width: 4,
          height: 4,
        },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
        backgroundColor:'rgba(255, 255, 255, 0.1)',
        borderRadius:10,
        padding:5 
      },
})