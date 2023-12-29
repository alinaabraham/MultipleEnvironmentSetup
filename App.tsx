import React, {useEffect} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Config from 'react-native-config';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
export default () => {
  console.log('jiiiiii', Config.CLI);
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      // webClientId: '1073605360118-joknhhdaejlk6f74qsc82g76of5rtd1p.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      webClientId:
        '715555092220-5avs8i7bl6neqfla198r83of7b855rpa.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId:
        '715555092220-251en4ejgurhjmpnqht3hsap15710bii.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
      openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
      profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
  }, []);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      if (Platform.OS === 'ios') {
        const hasSignedIn = await GoogleSignin.isSignedIn();
        console.log('#', hasSignedIn);

        if (hasSignedIn) {
          await GoogleSignin.revokeAccess();

          await GoogleSignin.signOut();
        }
      }
      console.log('1');
      const userInfo = await GoogleSignin.signIn();
      console.log('2', userInfo);

      console.log('userInfo', JSON.stringify(userInfo));
    } catch (error) {
      console.log('alina', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
    backgroundVideo: {
      height: 250,
      width: 250,
      backgroundColor: 'yellow',
    },
    textStyle: {fontSize: 20, alignSelf: 'center'},
    viewStyle: {flex: 1, justifyContent: 'center'},
  });
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20, color: 'black'}}>
        Hello, Welcome to React Native World!
      </Text>
      <Text style={{fontSize: 15, color: 'blue'}}>
        Implementation of Multiple Environmental Setup
      </Text>
      <Text style={{color: 'red'}}>{'(Schemas/Flavors)'}</Text>
      <Text style={{color: 'indigo'}}>
        {Config.ENV} : {Config.API_URL}
      </Text>
      <View>
        <TouchableOpacity onPress={signIn}>
          <Text style={styles.textStyle}>Google Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
