import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS } from '../constants'
import Header from '../components/Header'
import { ScrollView } from 'react-native-virtualized-view'

const termsAndConditionsContent = `
1. Acceptance of Terms and Conditions

By using this mobile application, you agree to be bound by these Terms and Conditions. If you do not agree to these Terms and Conditions, please do not use this application.

2. Changes to Terms

We reserve the right to change these Terms and Conditions at any time without prior notice. Please review these terms regularly to stay updated.

3. Use of the Application

You agree to use this application for lawful purposes only and in a manner consistent with all applicable laws and regulations.

4. Privacy Policy

Your use of the application is also governed by our Privacy Policy, which can be found [insert link to privacy policy].

5. Intellectual Property

All content in this application, including but not limited to text, graphics, logos, and images, is our property and protected by copyright laws.

6. Disclaimers

- This application is provided "as is" without any warranties, expressed or implied.
- We do not guarantee that the application will be error-free or uninterrupted.
- We are not responsible for any actions or content shared by users.

7. Limitation of Liability

We will not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of this application.

8. Governing Law

These Terms and Conditions are governed by and construed in accordance with the laws of [your jurisdiction].

9. Contact Information

If you have any questions or concerns regarding these Terms and Conditions, please contact us at [insert contact information].
`;


const TermsAndConditions = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: COLORS.white, padding: 16}}>
            <Header title="Terms And Conditions"/>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{...FONTS.body4}}>{termsAndConditionsContent}</Text>
            </ScrollView>
        </View>
    </SafeAreaView>
  )
}

export default TermsAndConditions