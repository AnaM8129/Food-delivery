import { dataBase } from "../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

const initialData = {
  key: "",
  value: "",
  collectionName: "",
};
export const filterCollection = async (data) => {
  const collectionName = data.collectionName;
  const usersCollection = collection(dataBase, collectionName);

  const arrayUsers = [];
  try {
    const q = data.key
      ? query(usersCollection, where(data.key, "==", data.value))
      : usersCollection;
    const userDocs = await getDocs(q);

    userDocs.forEach((doc) => {
      arrayUsers.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return arrayUsers;
  } catch (error) {
    console.log(error);
    return [];
  }
};
