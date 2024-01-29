import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { illustrations } from '../constants';
import PageContainer from '../components/PageContainer';
import DotsView from '../components/DotsView';
import Button from '../components/Button';
import Onboarding4Styles from '../styles/OnboardingStyles'; 
import { COLORS } from '../constants';

const Onboarding4 = ({ navigation }) => {
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
      // navigate to the Signup Screen
      navigation.navigate('Signup');
    }
  }, [progress, navigation]);

  return (
    <SafeAreaView style={Onboarding4Styles.container}>
      <StatusBar style="light" />
      <PageContainer>
        <View style={Onboarding4Styles.contentContainer}>
          <Image
            source={illustrations.illustration5}
            resizeMode="contain"
            style={Onboarding4Styles.illustration}
          />

          <View style={Onboarding4Styles.titleContainer}>
            <Text style={Onboarding4Styles.title}>Start Your Furniture</Text>
            <Text style={Onboarding4Styles.subTitle}>JOURNEY NOW</Text>
          </View>

          <Text style={Onboarding4Styles.description}>
          Sign up to start exploring a world of beautiful furniture for your home.
          </Text>

          <View style={Onboarding4Styles.dotsContainer}>
            {progress < 1 && <DotsView progress={progress} numDots={4} />}
          </View>

          <View style={Onboarding4Styles.buttonContainer}>
            <Button
              title="Next"
              filled
              onPress={() => navigation.navigate('Signup')}
              style={Onboarding4Styles.nextButton}
            />
            <Button
              title="Skip"
              onPress={() => navigation.navigate('Login')}
              textColor={COLORS.secondary}
              style={Onboarding4Styles.skipButton}
            />
          </View>
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};

export default Onboarding4;