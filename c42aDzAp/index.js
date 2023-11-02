import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
     databaseURL:"https://we-are-the-champions-5ac71-default-rtdb.asia-southeast1.firebasedatabase.app/" 
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const messageListIDB = ref(database, "messageList")

const inputBtn = document.getElementById("input-btn")
const ButtonBtn = document.getElementById("button-btn")
const messageListEl = document.getElementById("message-list")

ButtonBtn.addEventListener("click", function(){
    let inputValue = inputBtn.value
    
    push(messageListIDB, inputValue)
    
    myinputBtn()
    
})


onValue(messageListIDB, function(snapshot) {
    
    if (snapshot.exists()){
           let  itemArray = Object.entries(snapshot.val())
    
     clearMessageListEl()
         
    for (let i = 0; i < itemArray.length; i++){
        let currentItem = itemArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]        
        myMessageListEl(currentItem)
        
    }
    } else {
        messageListEl.innerHTML= "No messages here.... yet!"
    }
 
})


function  clearMessageListEl(){
    messageListEl.innerHTML = ""
}


function myinputBtn(){
       inputBtn.value = ""
}



function myMessageListEl(item) {
    
    let itemID = item[0]
    
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("dblclick", function(){
    let exactLocationOfItemInDB = ref(database, `messageList/${itemID}`)
    remove(exactLocationOfItemInDB)
        
    })
        
    messageListEl.append(newEl)
}