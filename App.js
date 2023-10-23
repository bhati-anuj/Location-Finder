import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet,ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import * as Device from 'expo-device';


export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [place, setPlace] = useState(null);


  useEffect(() => {
    (async () => {
    
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true  });
      setLocation(location);
      let { longitude, latitude } = location.coords;
        let place = await Location.reverseGeocodeAsync({ latitude, longitude });
        setPlace(place);
       
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      {/* <Text style={styles.paragraph}>{place}</Text> */}
      <View>
      <Text style={{ fontWeight: '700' }}>Current Location/Address:</Text>
      {place ? (
        <Text>
          {place ? `${place[0].name},` : ' '}
          {place ? `${place[0].district}, ` : ' '}
          {place ? `${place[0].city}, ` : ' '}
          {place ? `${place[0].region}, ` : ' '}
          {place ? `${place[0].country}, ` : ' '}
          {place ? `${place[0].postalCode}, ` : ' '}
          {/* {location ? `latitude: ${location.coords.latitude},` :""}
          {location ? `longitude: ${location.coords.longitude}, ` :""}
          {location ? `timestamp: ${new Date(location.timestamp)}, ` :""} */}
        </Text>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});

// import React, { useState, useEffect } from 'react';
// import { Platform, Text, View, StyleSheet, ScrollView } from 'react-native';

// import * as Location from 'expo-location';

// export default function App() {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [place, setPlace] = useState(null);

//   useEffect(() => {
//     const fetchLocation = async () => {
//       try {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//           setErrorMsg('Permission to access location was denied');
//           return;
//         }

//         Location.installWebGeolocationPolyfill();
//         const currentLocation = await new Promise((resolve, reject) => {
//           navigator.geolocation.getCurrentPosition(resolve, reject);
//         });
//         setLocation(currentLocation);

//         const { longitude, latitude } = currentLocation.coords;

//         const fetchedPlace = await Location.reverseGeocodeAsync({ latitude, longitude });
//         setPlace(fetchedPlace);
//       } catch (error) {
//         console.error('Error fetching location:', error);
//         setErrorMsg('Error fetching location');
//       }
//     };

//     fetchLocation();
//   }, []);

//   let text = 'Waiting..';
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = JSON.stringify(place);
//   }

//   if (!place) {
//     return (
//       <View>
//         <Text>...loading</Text>
//       </View>
//     );
//   } else {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.paragraph}>Name:- {place ? `${place[0].name} ` : ' '}</Text>
//         <Text style={styles.paragraph}>District:- {place ? `${place[0].district} ` : ' '}</Text>
//         <Text style={styles.paragraph}>City:{place ? `${place[0].city} ` : ' '}</Text>
//         <Text style={styles.paragraph}>Street:{place ? `${place[0].street} ` : ' '}</Text>
//         <Text style={styles.paragraph}>Region:{place ? `${place[0].region} ` : ' '}</Text>
//         <Text style={styles.paragraph}>Postal Code:{place ? `${place[0].postalCode} ` : ' '}</Text>
//         <Text style={styles.paragraph}>Country:{place ? `${place[0].country} ` : ' '}</Text>
//         <Text style={styles.paragraph}>Sub Region:{place ? `${place[0].subregion} ` : ' '}</Text>
//         <Text style={styles.paragraph}>Time Zone:{place ? `${place[0].timezone} ` : ' '}</Text>
//         <Text style={styles.paragraph}>Street Number:{place ? `${place[0].streetNumber} ` : ' '}</Text>
//         <Text style={styles.paragraph}>IsoCountryCode:{place ? `${place[0].isoCountryCode} ` : ' '}</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   paragraph: {
//     fontSize: 18,
//     textAlign: 'center',
//   },
// });