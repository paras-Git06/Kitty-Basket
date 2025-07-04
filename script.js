// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
   import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCyv8zUfDKfrcXvx5dzxW8B_NyWaDy8c",
    authDomain: "kitty-basket.firebaseapp.com",
    databaseURL: "https://kitty-basket-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kitty-basket",
    storageBucket: "kitty-basket.firebasestorage.app",
    messagingSenderId: "12394724149",
    appId: "1:12394724149:web:e2c692bb2c2db6afb3ea7c"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  console.log(db);

  
  const inputFieldEl = document.getElementById("input-field");
  const addButtonEl = document.getElementById("add-button");
  const itemsListEl = document.getElementById("items-list");

  addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;
    if (inputValue.trim() !== "") {
      const itemsRef = ref(db, "items");
      push(itemsRef, inputValue)
        .then(() => {
          console.log("Item added to Firebase:", inputValue);
          inputFieldEl.value = "";
        })
        .catch((error) => {
          console.error("Error adding item to Firebase:", error);
        });
    }
  });

  function displayItems(snapshot) {
    itemsListEl.innerHTML = "";
    if (snapshot.exists()) {
      const items = snapshot.val();
      Object.entries(items).forEach(([key, value]) => {
        const li = document.createElement("li");
        li.textContent = value;
        li.style.cursor = "pointer";
        li.title = "Click to delete";
        li.onclick = function() {
          removeItem(key);
        };
        itemsListEl.appendChild(li);
      });
    } else {
      itemsListEl.innerHTML = "<li>No items yet.</li>";
    }
  }

  function removeItem(key) {
    const itemRef = ref(db, `items/${key}`);
    import('https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js').then(({ remove }) => {
      remove(itemRef)
        .then(() => {
          console.log('Item deleted:', key);
        })
        .catch((error) => {
          console.error('Error deleting item:', error);
        });
    });
  }

  const itemsRef = ref(db, "items");
  onValue(itemsRef, displayItems);
