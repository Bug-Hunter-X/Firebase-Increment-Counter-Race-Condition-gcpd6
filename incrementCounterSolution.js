function incrementCounter(docRef) {
  return db.runTransaction(transaction => {
    return transaction.get(docRef).then(doc => {
      if (!doc.exists) {
        transaction.set(docRef, { counter: 1 });
        return 1; // Return initial value
      }
      const newCounter = doc.data().counter + 1;
      transaction.update(docRef, { counter: newCounter });
      return newCounter;
    });
  }).then(newCounter => {
    console.log("Counter incremented to:", newCounter);
    return newCounter;
  }).catch(error => {
    console.error("Transaction failed:", error);
    throw error; // Re-throw for handling by calling function
  });
}

// Example usage:
db.collection("counters").doc("myCounter").get().then((docSnapshot) => {
  if(docSnapshot.exists){
    incrementCounter(db.collection("counters").doc("myCounter"));
  } else{
    incrementCounter(db.collection("counters").doc("myCounter"));
  }
});