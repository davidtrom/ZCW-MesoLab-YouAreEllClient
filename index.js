import MessageService from "./message-service.js";

let userId = "davidtrom"; //sets userid variable to "bello"
const messageService = new MessageService(userId); //creates a new message service object
createFormListener();

window.addEventListener("load", function () {
    document.getElementById("greeting").innerHTML = `Welcome ${userId}!`;
    messageService.getAllMessages().then(successCallback, errorCallback);
    
    function successCallback(response) {
        //this data comes from the resolve method?
        populateMessages(response); //"Promise is successful!");
    }
    function errorCallback (response) {
        //this data comes from the resolve method?
        console.log(response); //"An error occured");
    }
});

function populateMessages(messages){
    messages.forEach(message => {
        addMessagesToThread(message);
    });
}

    // function populateThread(messages) {
    //     messages.forEach(message => {
    //         const messageListItem = document.createElement("LI");
    //         const userIdHeading = document.createElement("h3");
    //         const messageParagraph = document.createElement("p");
    //         const messageContent = document.createTextNode(message.message);
    //         const userIdContent = document.createTextNode(message.fromid);
    //         userIdHeading.appendChild(userIdContent);
    //         messageParagraph.appendChild(messageContent);
    //         messageListItem
    //             .appendChild(userIdHeading)
    //             .appendChild(messageParagraph);
    //         document.getElementById("message-list").appendChild(messageListItem);
    //     })
    // };


    function createFormListener () {
        const form = document.getElementById("new-message-form");

        form.onsubmit = function (event) {
            event.preventDefault();

            const data = {
                fromid: userId,
                message: form.message.value
            };

            messageService.createNewMessage(data)
                .then(successCallback, errorCallback);
                
            function successCallback(response) {  //this data comes from the resolve method
                addMessagesToThread(response);
            }

            function errorCallback(response){  //this data comes from the reject method
                console.log(response);
            }
        }
    };

    function addMessagesToThread (message){
        //messages.array.forEach(message => {
            const messageListItem = document.createElement("LI");
            const userIdHeading = document.createElement("h3");
            const messageParagraph = document.createElement("p");
            const messageContent = document.createTextNode(message.message);
            const userIdContent = document.createTextNode(message.fromid);
            userIdHeading.appendChild(userIdContent);
            messageParagraph.appendChild(messageContent);
            messageListItem
                .appendChild(userIdHeading)
                .appendChild(messageParagraph);
            document.getElementById("message-list").appendChild(messageListItem);
    }

