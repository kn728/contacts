import { storeContacts } from "./redux/features/contacts"

export function contactStore(dis) {
    
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
             console.log(data)
            dis(storeContacts(data))
      })
   
}