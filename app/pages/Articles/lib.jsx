import { db } from "@/app/Config/firebase";
import { doc, getDoc } from "firebase/firestore";


export async function getArticle(id) {
const collectionRefs = [
doc(db, 'Houses', id),
doc(db, 'Apartments', id),
doc(db, 'NewConstruction', id),
doc(db, 'Featured Houses', id),
doc(db, 'Featured Apartment', id),


];
 
try {
for (const ref of collectionRefs) {
const snapshot = await getDoc(ref);

if (snapshot.exists()) {
return snapshot.data();
}
}
  
return null;
} catch (error) {
return null;
}
}