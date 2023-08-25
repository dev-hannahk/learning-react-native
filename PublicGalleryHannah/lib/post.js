import firestore from '@react-native-firebase/firestore';

const postCollection = firestore().collection('post');

export function createPost({user, photoURL, description}) {
  return postCollection.add({
    user,
    photoURL,
    description,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
}
