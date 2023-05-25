import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


export const putDb = async (content) => {
  // Opens the 'jate' database with version 1 and assigns it to the jateDb variable
  const jateDb = await openDB('jate', 1);
  // Starts a transaction on the 'jate' object store with readwrite access
  const tx = jateDb.transaction('jate', 'readwrite');
  // Retrieves the 'jate' object store from the transaction
  const store = tx.objectStore('jate');
  // Puts the content object into the 'jate' object store with an ID of 1
  const request = store.put({ id: 1, value: content });
  // Waits for the put operation to complete and assigns the result to the result variable
  const result = await request;
  // Logs a message indicating that the data has been saved to the database
  console.log('data saved to the database', result);
};

export const getDb = async () => {
  // Opens the 'jate' database with version 1 and assigns it to the jateDb variable
  const jateDb = await openDB('jate', 1);
  // Starts a transaction on the 'jate' object store with readonly access
  const tx = jateDb.transaction('jate', 'readonly');
  // Starts a transaction on the 'jate' object store with readonly access
  const store = tx.objectStore('jate');
  // Retrieves all the data from the 'jate' object store
  const request = store.getAll();
  // Waits for the getAll operation to complete and assigns the result to the result variable
  const result = await request;
  // Logs the value property of the result, which contains the retrieved data
  console.log('result', result.value);
  return result?.value; // Returns the value property of the result, handling cases where the value property is undefined

};
initdb();
