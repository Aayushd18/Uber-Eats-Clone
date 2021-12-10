import React from 'react'
import { View, Text } from 'react-native'
import About from '../components/restaurantDetail/About'
import { Divider } from 'react-native-elements'
import MenuItems from '../components/restaurantDetail/MenuItems'
import ViewCart from '../components/restaurantDetail/ViewCart'

const foods = [
  {
    title: "Lasagna",
    description: "With butter lettuce, tomato and sauce bechamel",
    price: "$13.50",
    image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F24%2F2013%2F12%2Fgettyimages-998672040_0-2000.jpg&q=85",
  },
  {
    title: "Tandori Chicken",
    description: "With butter lettuce, tomato and sauce bechamel",
    price: "$19.20",
    image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F24%2F2013%2F12%2Fgettyimages-998672040_0-2000.jpg&q=85",
  },
  {
    title: "Chilaquiles",
    description: "With butter lettuce, tomato and sauce bechamel",
    price: "$14.50",
    image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F24%2F2013%2F12%2Fgettyimages-998672040_0-2000.jpg&q=85",
  },
  {
    title: "Chicken Ceaser Salad",
    description: "With butter lettuce, tomato and sauce bechamel",
    price: "$13.50",
    image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F24%2F2013%2F12%2Fgettyimages-998672040_0-2000.jpg&q=85",
  },
  {
    title: "Lasagna",
    description: "With butter lettuce, tomato and sauce bechamel",
    price: "$13.50",
    image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F24%2F2013%2F12%2Fgettyimages-998672040_0-2000.jpg&q=85",
  },
  {
    title: "Lasagna",
    description: "With butter lettuce, tomato and sauce bechamel",
    price: "$13.50",
    image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F24%2F2013%2F12%2Fgettyimages-998672040_0-2000.jpg&q=85",
  },{
    title: "Lasagna",
    description: "With butter lettuce, tomato and sauce bechamel",
    price: "$13.50",
    image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F24%2F2013%2F12%2Fgettyimages-998672040_0-2000.jpg&q=85",
  }
]

export default function RestaurantDetail({ route, navigation }) {
  return (
    <View>
      <About route={route} />
      <Divider width={1.8}/>
      <MenuItems restaurantName={route.params.name} foods={foods} marginLeft={0} hideCheckbox={false}/>
      <ViewCart navigation={navigation}/>
    </View>
  )
}
  