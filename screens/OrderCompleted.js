import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import LottieView from 'lottie-react-native'
import firebase from '../firebase'
import MenuItems from '../components/restaurantDetail/MenuItems'

export default function OrderCompleted() {
  const [lastOrder, setLastOrder] = useState({
    items: [
      {
        title: "Lasagna",
        description: "With butter lettuce, tomato and sauce bechamel",
        price: "$13.50",
        image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F24%2F2013%2F12%2Fgettyimages-998672040_0-2000.jpg&q=85",
      },
    ]
  })
  const { items, restaurantName } = useSelector((state) => state.cartReducer.selectedItems)
  const total = items.map(item => Number(item.price.replace('$', ''))).reduce((prev, curr) => prev + curr, 0)

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  })

  useEffect(() => {
    const db = firebase.firestore()
    const unsubscribe = db.collection("orders")
    .orderBy('createdAt', 'desc')
    .limit(1)
    .onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        setLastOrder(doc.data())
      })
    })

    return () => unsubscribe()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{
        margin: 20,
        alignItems: "center",
        height: "98%"
      }}>
        <LottieView style={{ height: 100, alignSelf: "center", marginBottom: 30 }}
        source={require("../assets/animations/check-mark.json")}
        autoPlay
        speed={0.5}
        loop={false} />
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>Your order at {restaurantName} is placed at {totalUSD}</Text>
        <ScrollView>
        <MenuItems foods={lastOrder.items} hideCheckbox={true} marginLeft={10} />
        <LottieView style={{ height: 200, alignSelf: "center" }}
          source={require("../assets/animations/cooking.json")}
          autoPlay
          speed={0.5} />
        </ScrollView>
        </View>
    </SafeAreaView>
  )
}
