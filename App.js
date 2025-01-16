import React, {useState} from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

export default function App() {
  const [image, setImage] = useState(null);

// função usando Callback
  function AbrirAlbum() {
    const options = {
      MediaType: 'photo', //selecionar apenas foto
      quality: 1, //melhor qualidade
      selectionLimit: 1 //selecionar 1 foto
    }

    launchImageLibrary(options, (Response) => {

      //Abriu album e cancelou
      if (Response.didCancel) {
        console.log("Album Picker cancelado");
        return;
      }

      //Gerou erro 
      else if (Response.error) {
        console.log("Gerou erro na função", Response.errorMessage);
      }

       //Ocorreu sucesso
      console.log(Response.assets);
      //Passando Imagem para useState
      setImage(Response.assets[0].uri);

    })
  }

 async function AbrirCamera() {

 const options = {
  MediaType: 'photo', //selecionar apenas foto
  quality: 1, //melhor qualidade
  saveToPhotos: true //salvar na galeria
 }

      const Response = await launchCamera(options)

      console.log(Response.assets);
      setImage(Response.assets[0].uri);

  }

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.btns}>

      <TouchableOpacity style={styles.btn} onPress={AbrirAlbum}>
          <Text style={styles.txt}>Abrir Album</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={AbrirCamera}>
          <Text style={styles.txt}>Abrir Camera</Text>
        </TouchableOpacity>

      </View>

     {
      //Se for diferente de vazio, pode carregar a imagem
      image !== null && (
        <Image
      style={styles.img}
      source={{uri: image}}
     />
      ) 
      
     }


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  btns: {
    flexDirection: 'row',
    marginTop: 14,
    gap: 15,
  },

  btn: {
    backgroundColor: '#121212',
    padding: 4,
    paddingLeft: 16,
    paddingRight: 16,
    margin: 5,
    borderRadius: 5
  },

  txt: {
    color: '#ffff'
  },

  img:{
    marginTop: 15,
    width: '90%',
    height: 300,
    objectFit: "cover"
  }




});