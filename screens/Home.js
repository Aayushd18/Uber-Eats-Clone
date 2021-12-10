import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { Divider } from 'react-native-elements'
import BottomTabs from '../components/home/BottomTabs'
import Categories from '../components/home/Categories'
import HeaderTabs from '../components/home/HeaderTabs'
import RestaurantItems from '../components/home/RestaurantItems'
import SearchBar from '../components/home/SearchBar'

const YELP_API_KEY = "HqT1NiwhCmy80xpCJi-zvpZtVSWNqFm1wJF_Itwnf8DlXw7KVdhqpNC3XFKQwiK8UB67ZZ5wZa6RGz235FPmupkDhiFEEDfKavQFwkXj_2fHg4MxXjxwKMTQdhZPYXYx"

export default function Home({ navigation }) {
  const [restaurantData, setRestaurantData] = useState([])
  const [city, setCity] = useState("LosAngeles")
  const [activeTab, setActiveTab] = useState("Delivery")

  const getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurant&location=${city}`

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };
    return fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((json) => setRestaurantData(json.businesses.filter((business) => business.transactions.includes(activeTab.toLowerCase()))));
  };

  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab])

  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      <View style={{ backgroundColor: "white", padding: 25 }}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems restaurantData={restaurantData} navigation={navigation} />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs />
    </SafeAreaView>
  )
}
