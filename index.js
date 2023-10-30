import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://add-to-cart-3a67d-default-rtdb.firebaseio.com/",
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDb = ref(database, "shoppingList")

const input = document.getElementById("input-field")
const btn = document.getElementById("add-button")


btn.addEventListener("click", () => {
    let inputValue = input.value
    
    push(shoppingListInDb, inputValue)

    console.log(inputValue)
})