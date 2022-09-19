
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
  React.useEffect(() => {
    contactStore(dis)         
},[])

  const contacts = useSelector((state => state.contacts))

  const [searchedContacts, setSearchedContacts] = React.useState([])
  const [contact, selectContact] = React.useState()
  const [needHelp, setNeedHelp] = React.useState(false)

 

  function getContacts(e){
    const temp = []
    const w = e.target.value
    contacts.forEach(con => {  
      if(!w) {
        return
      }    
      if(con.name.includes(w) || con.name.toLowerCase().includes(w)) {
        temp.push(con)
      }
      else{return}
    });
    setSearchedContacts(temp)
  }
  function setContact(idx) {
    const  con = contacts[idx-1]
    selectContact(con)
    setNeedHelp(false)
    console.log(idx)
  }

  React.useEffect(()=> {
    setSearchedContacts([])
  }, [contact])

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
