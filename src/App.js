
import './App.css';
import {useDispatch, useSelector} from 'react-redux'
import {storeContacts} from './redux/features/contacts.js'
import React from 'react';
import {Card, TextField, Stack, Paper} from '@mui/material'
import { contactStore } from './contactFunctions';
import ContactDisplay from './Components/ContactDisplay';
import contactLogo from './images/contactLogo.png'
import HelpIcon from '@mui/icons-material/Help';

function App() {
  
  const dis = useDispatch()

  //stores the contacts into the redux storage
  React.useEffect(() => {
    contactStore(dis)         
},[])
  //retrieves the contacts from redux state store
  const contacts = useSelector((state => state.contacts))

  const [searchedContacts, setSearchedContacts] = React.useState([])//stores the list of potential contacts
  const [contact, selectContact] = React.useState() //stores the selected contact information
  const [needHelp, setNeedHelp] = React.useState(false) //check if user needs help

 
  //gets the contacts whose names include whats in the search bar
  function getContacts(e){
    const temp = []
    const w = e.target.value //stores the value of the search box
    if(w) { //ensures w has value before searching
    contacts.forEach(con => {           
        if(con.name.includes(w) || con.name.toLowerCase().includes(w)) { //ensures search is not case sensitive
          temp.push(con)//adds contacts whos names include w
        }
        else{return} //moves on to the next iteration
      });
    }
      setSearchedContacts(temp) //sets the state of searched contacts
  }
  //sets the contact that is chosen by the user
  function setContact(idx) {
    const  con = contacts[idx-1]
    selectContact(con)
    setNeedHelp(false)
    console.log(idx)
  }

  //ensures searched contacts is set back to empty once contact page is exited
  React.useEffect(()=> {
    setSearchedContacts([])
  }, [contact])

  //maps the list of contacts that fits the search criteria
  const contactList = searchedContacts.map((con) => {
        const idx = con.id
      return (      
            <Card className='names' onClick={() => setContact(idx)} 
            sx={{height: '30px',width:'50%', marginBottom:'10px', 
            textAlign:'center', display:'grid', placeItems:'center'}}>{con.name}</Card>
          
        )
      })
      

  return (
    <div className="App">
     { !contact && <Paper sx ={{minHeight: '60vh', width: '600px', backgroundColor:'lightgrey', position:'fixed'}} >
        <div style={{width:'100%', display: 'flex', flexDirection:'column', alignItems:'center'}}>
          <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <img src={contactLogo} width='50px' height='50px' style={{marginRight:'10px'}}/>
            <h1>Contacts</h1>
          </div>
          <TextField sx={{margin: '20px', width:'60%'}} label='search' onChange={getContacts}/>
        </div>
        <Stack alignItems='center'>{contactList}</Stack>
        <HelpIcon sx={{position:'absolute', left:'90%', top:'93%'}} className='change' onClick={() => setNeedHelp(prev => !prev)}/>
        {needHelp && <Card sx={{width:"60%", position:'absolute',left: '26%', top:'78%', padding:'10px'}}>
              <p>Just type in the name you are searching for in the search bar to look for people.
                 To see more specific information about each contact click on their listed name. 
                 Click on question mark to get rid of me!</p>
          </Card>}
      </Paper> }
      {contact && <Paper sx ={{minHeight: '60vh', width: '600px', margin:'2px',backgroundColor:'lightGrey', position:'fixed'}}>
         <ContactDisplay contact = {contact} emptyContact={() => selectContact(null) }/>
      </Paper>}

    </div>
  );
}

export default App;
