import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import React, { useEffect, useState,  } from 'react'
import { COLORS, FONTS, SIZES  } from '../constants'
import Button from '../components/Button'
import { ActivityIndicator } from 'react-native'
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

const CaptureProduct = () => {
    const [permission, requestPermission] = Camera.useCameraPermissions()
    const [capturedImage, setCapturedImage] = useState(null)
    const [capturedBase64Image, setCapturedBase64Image] = useState(null)
    const [recognized, setRecognized] = useState(false)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)
    const [camera, setCamera] = useState(null);
    const [sound, setSound] = useState();
    const [hasPermission, setHasPermission] = useState(null);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const redirectNavigation = useNavigation()

    const onCameraReady = () => {
        setIsCameraReady(true);
         };

    useEffect(() => {
        (async () => {
     const { status } = await Camera.requestCameraPermissionsAsync()
     setHasPermission(status === "granted");
        })();
      }, []);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/audio/camera-picture.mp3') 
      );
      setSound(sound);
    };
  
    loadSound();
  
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);


    const captureImage = async () => {
        if (camera){
            setError("");

            try{
                const photo = await camera?.takePictureAsync({
                    base64: true,
                    width: 800,
                    height: 800,
                    quality: 0.2,
                    skipProcessing: true 
                });
    
                if (sound) {
                    await sound.replayAsync();
                }
                if(photo && photo.uri){
                    setCapturedImage(photo.uri);
                    setCapturedBase64Image(photo.base64);
                    setRecognized(true);
                }
    
                // const sizeInBytes = photo.base64.length;
                // const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
                // console.log(`Size of the image: ${sizeInMB} MB`);
            }catch(err){
                console.log(err)
            }
        }
            };

    const recognizeImage = ()=>{
        console.log("Implementing the plant recognition function");
        redirectNavigation.navigate("Search")
    }
    
    useEffect(() => {
        requestPermission(permission)
    }, [])

    if (!permission?.granted) {
        return
    }

    if (hasPermission === null) {
        return <View />;
         }
     if (hasPermission === false) {
        return <Text style={styles.text}>No access to camera</Text>;
    }
    return (
        <View style={styles.container}>
            {recognized ? (
                <View style={styles.imageContainer}>
                    {capturedImage && (
                        <Image
                            source={{ uri: capturedImage }}
                            style={styles.image}
                        />
                    )}
                    <Button
                        title="Retake Picture"
                        filled
                        onPress={() => setRecognized(false)}
                        style={{
                            width: SIZES.width * 0.8,
                            marginVertical: 12,
                            backgroundColor: COLORS.primary,
                            borderColor: COLORS.primary
                        }}
                    />
                    <TouchableOpacity
                      onPress={() => recognizeImage()}
                      style={{
                        width: SIZES.width * 0.8,
                        paddingHorizontal: SIZES.padding,
                        paddingVertical: SIZES.padding,
                        borderColor: COLORS.primary,
                        borderWidth: 2,
                        borderRadius: SIZES.padding,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.white
                      }}
                    >
                      {
                        loading == true ? (
                          <ActivityIndicator 
                          size="large" 
                          color={COLORS.blue}
                          />
                        ) : (
                          <Text style={{ 
                            ...FONTS.body2,
                            color: COLORS.primary
                          }}>Search Product</Text>
                        )
                      }
                    </TouchableOpacity>
                    {error && (<Text style={{...FONTS.body4, color: 'red', marginVertical: 12}}>{error}</Text>)}
                </View>
            ) : (
                <View>
                    <Camera
                        ref={(ref) => setCamera(ref)}
                        style={styles.camera}
                        type={CameraType.back}
                        onCameraReady={onCameraReady}
                        onMountError={(error) => {
                            console.log("camera error", error);
                        }}
                    >
                            <TouchableOpacity
                            activeOpacity={0.1}
                            disabled={!isCameraReady}
                            style={styles.buttonContainer} 
                            onPress={captureImage}
                            >
                               <Ionicons name="ios-radio-button-on" size={150} color={COLORS.white} />
                            </TouchableOpacity>
                    </Camera>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        height: '100%',
        width: '100%',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        zIndex: 99999
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '100%',
    },
    image: {
        height: SIZES.width * 0.8,
        width: SIZES.width * 0.8,
    },
})

export default CaptureProduct