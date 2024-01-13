import React from "react"
import { Modal, StyleSheet } from "react-native"
import { CustomColors } from "../../../styles/color"
import LinearGradient from "react-native-linear-gradient"

export default MusicPlayer = ({}) =>{
    return(
        <Modal isVisible>
            <LinearGradient style={styles.bigcontainer}
            colors={['#8962f3', '#4752e2', '#214ae2']}
            >

            </LinearGradient>

        </Modal>
    )
}

const styles = StyleSheet.create({
    bigcontainer:{
        flex:1,
    }
})