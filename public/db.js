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

}

function checkDatabase() {
    
}

// listen for app coming back online
window.addEventListener('online', checkDatabase);