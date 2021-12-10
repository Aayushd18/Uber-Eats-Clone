import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import OrderItem from './OrderItem'
import firebase from '../../firebase'
import LottieView from 'lottie-react-native'

export default function ViewCart({ navigation }) {
  const [modalVisible, setModalVisisble] = useState(false)
  const [loading, setLoading] = useState(false)

  const { items, restaurantName } = useSelector((state) => state.cartReducer.selectedItems)
  const total = items.map(item => Number(item.price.replace('$', ''))).reduce((prev, curr) => prev + curr, 0)

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  })

  const addOrderToFireBase = () => {
    setLoading(true)
    const db = firebase.firestore()
    db.collection("orders").add({
      items: items,
      restaurantName: restaurantName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      setTimeout(() => {
        setLoading(false)
        
        navigation.navigate("OrderCompleted")
      }, 2500)
    })
    
  }

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.7)"
    },
    modalCheckoutContainer: {
      backgroundColor: "white",
      padding: 16,
      height: 500,
      borderWidth: 1,
    },
    restuarantName: {
      textAlign: "center",
      fontWeight: "600",
      fontSize: 18,
      marginBottom: 10
    },
    subtotalContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
    },
    subtotalText: {
      textAlign: "left",
      fontWeight: "600",
      fontSize: 15,
      marginBottom: 10,
    }
  })
  
  const checkoutModalContent = () => {
    return (
      <>
        <View style={styles.modalContainer}>
          <View style={styles.modalCheckoutContainer}>
            <Text style={styles.restuarantName}>{restaurantName}</Text>
            {items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
          <View style={styles.subtotalContainer}>
              <Text style={styles.subtotalText}>Subtotal</Text>
              <Text>{' $ ' + totalUSD}</Text>
          </View>
          <View style={{
            flexDirection: "row",
            justifyContent: "center",
          }}>
            <TouchableOpacity style={{
              marginTop: 20,
              backgroundColor: "black",
              alignItems: "center",
              padding: 13,
              borderRadius: 30,
              width: 300,
              position: 'relative'
            }}
            onPress={() => {
              addOrderToFireBase()
              setModalVisisble(false)
            }}>
              <Text style={{
                color: "white",
                fontSize: 20,
              }}>Checkout</Text>
              <Text style={{
                position: "absolute",
                right: 20,
                color: "white",
                fontSize: 15,
                top: 17
              }}>{total ? ' $ ' + totalUSD: ""}</Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
      </>
    )
  }

  return (
    <>
    <Modal animationType='slide' visible={modalVisible}
    transparent={true} onRequestClose={() => setModalVisisble(false)} >
      {checkoutModalContent()}
    </Modal>
    {total ? (
      <View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        position: "absolute",
        bottom: 350,
        zIndex: 999,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: "center",
          width: "100%",
        }}>
          <TouchableOpacity style={{
            marginTop: 20,
            backgroundColor: "black",
            flexDirection: "row",
            justifyContent: "flex-end",
            padding: 15,
            borderRadius: 30,
            width: 300,
            position: "relative"
          }}
            onPress={() => setModalVisisble(true)}>
            <Text style={{ color: "white", fontSize: 20, marginRight: 40 }}>View Cart</Text>
            <Text style={{ color: "white", fontSize: 20 }}>{' $ ' + totalUSD}</Text>
          </TouchableOpacity>
        </View>
      </View>)
      : (<></>)}
      {loading ? <View style={{
        backgroundColor: "black",
        flex: 1,
        width: "100%",
        height: "100%",
        position: "absolute",
        opacity: 0.6,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <LottieView 
        style={{height: 200}}
        source={require("../../assets/animations/scanner.json")}
        autoPlay
        speed={3} />
      </View> : <></>}
    </>
  )
}
