import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://add-to-cart-3a67d-default-rtdb.firebaseio.com/",
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDb = ref(database, "shoppingList")

const input = document.getElementById("input-field")
const btn = document.getElementById("add-button")
const shoppingList = document.getElementById("shopping-list")


function clearInputValue() {
    input.value = ""
}

function addItem(item) {
    let currentId = item[0]
    let currentValue = item[1]

    let listElement = document.createElement("li")

    listElement.textContent = currentValue

    listElement.addEventListener("click", () => {
        console.log(currentId)
        let exactLocationOfItemInDb = ref(database, `shoppingList/${currentId}`)
        remove(exactLocationOfItemInDb)
    })
    shoppingList.appendChild(listElement)
}




function clearShoppingList() {
    shoppingList.innerHTML = ""
}

btn.addEventListener("click", () => {
    let inputValue = input.value
    push(shoppingListInDb, inputValue)
    clearInputValue()
})

onValue(shoppingListInDb, function(snapshot) {

    if(snapshot.exists()){
        let shoppingItemArray = Object.entries(snapshot.val())
        clearShoppingList()

            for (let i = 0; i < shoppingItemArray.length; i++) {
            let currentItem = shoppingItemArray[i]
            let currentItemId = currentItem[0]
            let currentItemValue = currentItem[1]

            addItem(currentItem)
        }
    } else {
        shoppingList.innerHTML = "No items here yet..."
    }
 

}) 

