import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as cors from "cors";

admin.initializeApp();

const firestore = admin.firestore();
const corsMiddleware = cors({origin: true});

interface User {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  personalInfo: {
    age: number;
    address: string;
  };
  contactInfo: {
    phoneNumber: string;
    email: string;
  };
  education: string;
  experiences: string[];
  extraInfo: string;
}

export const myApi = functions.https.onRequest((req, res) => {
  const usersCollection = firestore.collection("users");

  return corsMiddleware(req, res, async () => {
    if (req.method === "POST") {
      const data = req.body;
      await usersCollection.add(data);
      res.status(201).send("Created");
    } else if (req.method === "GET") {
      const snapshot = await usersCollection.get();
      const results: User[] = [];
      snapshot.forEach((doc) => {
        results.push({id: doc.id, ...doc.data()} as User);
      });
      res.status(200).json(results);
    } else if (req.method === "DELETE") {
      const documentId = req.query.id;
      if (typeof documentId === "string") {
        await usersCollection.doc(documentId).delete();
        res.status(200).send("Deleted");
      } else {
        res.status(400).send("Bad Request: Missing or invalid document ID");
      }
    } else {
      res.status(405).send("Method Not Allowed");
    }
  });
});
