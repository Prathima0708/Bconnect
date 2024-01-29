import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { illustrations } from '../constants';
import PageContainer from '../components/PageContainer';
import DotsView from '../components/DotsView';
import Button from '../components/Button';
import Onboarding3Styles from '../styles/OnboardingStyles'; 
import { COLORS } from '../constants';

const Onboarding3 = ({ navigation }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 1) {
          clearInterval(intervalId);
          return prevProgress;
        }
        return prevProgress + 0.25;
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (progress >= 1) {
      // navigate to the Onboarding4 Screen
      navigation.navigate('Onboarding4');
    }
  }, [progress, navigation]);

  return (
    <SafeAreaView style={Onboarding3Styles.container}>
      <StatusBar style="light" />
      <PageContainer>
        <View style={Onboarding3Styles.contentContainer}>
          <Image
            source={illustrations.illustration3}
            resizeMode="contain"
            style={Onboarding3Styles.illustration}
          />

          <View style={Onboarding3Styles.titleContainer}>
            <Text style={Onboarding3Styles.title}>Easy Home Decor</Text>
            <Text style={Onboarding3Styles.subTitle}>SHOPPING</Text>
          </View>

          <Text style={Onboarding3Styles.description}>
          Simplify your search for the best home decor and furniture with our user-friendly app.
          </Text>

          <View style={Onboarding3Styles.dotsContainer}>
            {progress < 1 && <DotsView progress={progress} numDots={4} />}
          </View>

          <View style={Onboarding3Styles.buttonContainer}>
            <Button
              title="Next"
              filled
              onPress={() => navigation.navigate('Onboarding4')}
              style={Onboarding3Styles.nextButton}
            />
            <Button
              title="Skip"
              onPress={() => navigation.navigate('Login')}
              textColor={COLORS.secondary}
              style={Onboarding3Styles.skipButton}
            />
          </View>
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};

export default Onboarding3;