let db;

const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function (event) {
    db = event.target.result;
    const pendingStore = db.createObjectStore("pending", { autoIncrement: true });
};

request.onsuccess =  function (event) {
    db = event.target.result;

    if (navigator.onLine) {
        checkDatabase();
    }
}

request.onerror = function(event) {
    console.log("Error: " + event.target.errorCode);
  };

function saveRecord(record) {
    const transaction = db.transaction(["pending"], "readwrite");
    const pendingStore = transaction.objectStore("pending");
    pendingStore.add(record);
}

function checkDatabase() {
    const transaction = db.transaction(["pending"], "readwrite");
    const pendingStore = transaction.objectStore("pending");
    const getAll = pendingStore.getAll();

    getAll.onsuccess = function () {
      if (getAll.result.length > 0) {
        fetch("/api/transaction/bulk", {
          method: 'POST',
          body: JSON.stringify(getAll.result),
          headers: {
          Accept: 'application/json, text/plain, */*',
					'Content-Type': 'application/json',
          }
        })
				.then((response) => response.json())
        .then(() => {
          // open a transaction on your pending db
          const transaction = db.transaction(["pending"], "readwrite");
          // access your pending object store
          const pendingStore = transaction.objectStore("pending")
          // clear all items in your store
          pendingStore.clear();
        });
      }
    }
}

// listen for app coming back online
window.addEventListener('online', checkDatabase);