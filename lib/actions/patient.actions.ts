'use server'

import { ID, Query } from 'node-appwrite';
import {BUCKET_ID, DATABASE_ID, databases, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID, storage, users} from '../appwrite.config';
import { parseStringify } from '../utils';
import { InputFile } from 'node-appwrite/file';
// the user data passed in contains the username, email and phone number
export const createUser = async (user : CreateUserParams) => {
   try{
    // the user takes id, email, phone, password (which we do not have yet) and name
    const newUser = await users.create(ID.unique(), user.email, user.phone, undefined, user.name);
    return newUser;
  }
    catch(e : any){
      // if there is a conflict error, it means the user already exists
      if (e && e?.code === 409){
        // find the user by email and return the user
        const documents = await users.list([Query.equal('email', [user.email])]);
        return documents?.users[0];
      }
    }
}

export const registerPatient = async ({identificationDocument, ...patient} : RegisterUserParams) => {
  try{
    // store the identification document in the appwrite storage, not in database
    let file;

    if (identificationDocument){
      const inputFile = InputFile.fromBuffer(identificationDocument?.get('blobFile') as Blob,
      identificationDocument?.get('fileName') as string);
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentURL: `${ENDPOINT}/storage.buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        ...patient
      }
    )

    return parseStringify(newPatient);
  }
  catch(e){
    console.error(e);
  }
}

export const getUser = async (userId : string) => {
  try{
    const user = await users.get(userId);
    return parseStringify(user);
  }
  catch(e){
    console.error(e);
  }
}