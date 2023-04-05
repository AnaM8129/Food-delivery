import { collection, getDocs, query, where } from "firebase/firestore";
import { dataBase } from "../firebase/firebaseConfig";

const collectionName = "userCollection";
const usersCollection = collection(dataBase, collectionName);

export const userCollectionFunction = async (uid) => {
  const arrayUsers = [];
  try {
    const q = query(usersCollection, where("uid", "==", uid));
    const userDocs = await getDocs(q);
    userDocs.forEach((doc) => {
      arrayUsers.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return arrayUsers[0];
  } catch (error) {
    console.log(error);
  }
};
