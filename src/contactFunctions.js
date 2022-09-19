import { storeContacts } from "./redux/features/contacts"

export function contactStore(dis) {
    //retrieves the contacts from API
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
            dis(storeContacts(data)) //calls the reducer function that stores the contacts into redux
      })
   
}