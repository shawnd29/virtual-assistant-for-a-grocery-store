# virtual-assistant-for-a-grocery-store
This is a representation of a virtual assistant for a grocery store using Google Dialogflow as the conversational assistant and Google Firestore as the NoSQL database

To utilize the Dialogflow intents in your own agent, simply go the the Export and Import tag in the agent settings, click on 'Import from Zip' and drag and drop the zip file.


Required modules:

The backend requires Node.js to function. The modules associated with these are as follows:

Mathematical calculations -  math.js: http://mathjs.org/download.html

Time based calculations -    moment.js: https://momentjs.com/


You can find a step by step implementation of firestore at: https://firebase.google.com/docs/firestore/quickstart


NOTE:  There are 2 collections that are present in the firestore database, "Test" and "Cart"

The Documents in Test consist of any product that is to be availabe in the store

The fields for each document in Test are as follows: (These have to be manually inserted)

Field:        Type:
about         string
discount      number
expired       number  
id            number
location      string    
name          string
obtained      number
price         number
quantity      number
type          string



The fields for each document in Cart are as follows:   (This will be automatically updated when the user interacts with the system)

Field:        Type:
discount      number
name          string
price         number
quantity      number
