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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => { 
  console.error('Post Data');

  // Open a connection to the 'jate' database with value 1
  const jateDb = await openDB('jate', 1);

  // Start a read-write transaction on the 'jate' object store
  const tx = jateDb.transaction('jate', 'readwrite');

  // Get the object store
  const store = tx.objectStore('jate');

  // Use the .put() method to add content to the object store
  const request = store.put({ id: 1, content: content });

  // Wait for the request to complete and get the result
  const result = await request;
  console.log('successfully saved data to database', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('Get Request');

  // Open a connection to the 'jate' database
  const jateDb = await openDB('jate', 1);

  // Start a read-only transaction on the 'jate' object store
  const tx = jateDb.transaction('jate', 'readonly');

  // Get the object store
  const store = tx.objectStore('jate');

  // Use the .get() method to retrieve data from the object store based on the id
  const request = store.get(1);

  // Wait for the request to complete and return the value
  const result = await request;
  return result.value;
}
initdb();
