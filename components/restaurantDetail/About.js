import React from 'react'
import { View, Text, Image } from 'react-native'

const yelpRestaurantInfo = {
  name: "Farmhouse Kitchen Thai Cuisine",
  image: "https://images.livemint.com/img/2021/04/04/600x338/Bengaluru_1608514504360_1608514508850_1617556467956.PNG",
  price: "$$",
  reviews: "1500",
  rating: 4.5,
  categories: [{title: "Thai"}, {title: "Confort Food"}],
}


export default function About(props) {
  const { name, image, price, reviews, rating, categories } = props.route.params
  const formattedCategories = categories.map((cat) => cat.title).join(" · ")
  const description = `${formattedCategories} ${price ? ' ­· ' + price : "" } · 🎟️ · ${rating} ⭐ (${reviews}+)`
  return (
    <View>
      <RestaurantImage image={image} />
      <RestaurantName name={name} />
      <RestaurantDescription description={description} />
    </View>
  )
}

const RestaurantImage = (props) => (
  <Image source={{uri: props.image}} style={{width: "100%", height: 180 }} />
)

const RestaurantName = (props) => (
  <Text style={{ fontSize: 29, fontWeight: "600", marginTop: 10, marginHorizontal: 15 }}>{props.name}</Text>
)

const RestaurantDescription = (props) => (
  <Text style={{
    marginTop: 10,
    marginHorizontal: 15,
    fontWeight: "400",
    fontSize: 15.5,
  }}>{props.description}</Text>
)