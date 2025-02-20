function incrementCounter(docRef) {
  docRef.get().then((doc) => {
    if (doc.exists) {
      const counter = doc.data().counter || 0; // Handle missing counter
      docRef.update({ counter: counter + 1 });
    } else {
      // Handle document not found
      console.error("Document does not exist!");
    }
  }).catch((error) => {
    console.error("Error getting document: ", error);
  });
}

// Example usage:
db.collection("counters").doc("myCounter").get().then((docSnapshot) => {
  if(docSnapshot.exists){
    incrementCounter(db.collection("counters").doc("myCounter"));
  } else{
    db.collection("counters").doc("myCounter").set({counter:0})
    .then(()=>{
      incrementCounter(db.collection("counters").doc("myCounter"));
    })
    .catch((error)=>{
      console.log(error)
    })
  }
});