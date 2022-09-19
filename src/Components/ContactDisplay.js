import React from 'react'
import { Stack, Card } from '@mui/material'
import contactLogo from '../images/contactLogo.png'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import profileDefault from '../images/profileDefault.png'

//display the contact information
export default function contactDisplay(props) {
    const p = props.contact //stores the contact for easier access
    return(
        <div style={{minHeight:'50vh', width:'100%'}}>

            <Stack alignItems='center'>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <ArrowBackIosIcon className='change' onClick={props.emptyContact} sx={{position:'absolute', left:'30px'}}>back</ArrowBackIosIcon>

                    <img src={contactLogo} width='50px' height='50px' style={{marginRight:'10px'}}/>
                    <h1>Contacts</h1>
                </div>
                <img src={profileDefault} style={{alignSelf:'center', borderRadius:'10px'}} width='60%' height='300px'/>

                <div style={{margin:'30px',width: '80%'}}>
                    <h1 style={{textAlign:'center'}}>{p.name}</h1>
                    <Card sx={{backgroundColor:'lightGrey', padding:'10px', display:'flex', justifyContent:'space-around'}}>
                    <Stack sx={{width:'12%'}}>
                    <h5 style={{textAlign:'right'}}>Address:</h5>
                    <h5 style={{textAlign:'right'}}>Email:</h5>
                    <h5 style={{textAlign:'right'}}>Phone:</h5>
                    <h5 style={{textAlign:'right'}}>Website:</h5>

                    </Stack>
                    <Stack >
                    <h5 style={{textAlign:'left'}}> {p.address.suite + ' ' + p.address.street+ ', ' + p.address.city +', ' + p.address.zipcode}</h5>
                    <h5 style={{textAlign:'left'}}> {p.email}</h5>
                    <h5 style={{textAlign:'left'}}> {p.phone}</h5>
                    <h5 style={{textAlign:'left'}}> {p.website}</h5>
                    </Stack>
                    </Card>
                </div>

            </Stack>
        </div>
    )
}