import React from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsalAuthentication } from "@azure/msal-react"
import { Button } from './button'
import { useMsal } from '@azure/msal-react'
import { useAccount } from '@azure/msal-react'
import { tokenRequest } from '../../msalConfig'
import { useState, useEffect } from 'react'

import { Text } from './text'

function UserTokens () {
  
// const { login, result, error } = useMsalAuthentication("popup")

  const { instance, accounts, inProgress } = useMsal();
  const [accToken, setaccToken] = useState("")
  const [idToken, setidToken]  = useState("")
  const [tokenStatus, setTokenStatus] = useState("")

  const account = useAccount(accounts?.[0] || {} );

  const GetTokens = () => {
    console.log("Getting Tokens")
    

    if (account)
    {
      getTokenSilent();
    }
    else{
      setTokenStatus("Authenticating user before acquiring token\n")
      instance.acquireTokenPopup(tokenRequest).then(response => {
        if (response.accessToken)  {
          console.log('Token Response: ', response)
          setidToken(response.idToken)
          setaccToken(response.accessToken)

          setTokenStatus("Acquired Token")

          //callAPI(response.accessToken)

        }
        else
        {
          setaccToken("")
          setTokenStatus("Failed token acquisition\n")
        }

      }).catch(err => {
        setTokenStatus("Failed token acquisition\n")
        console.error(err);
      })
    }

  }
  const getTokenSilent = async () => {
    setTokenStatus("Acquiring Token for Logged in User\n")
    setaccToken("")
    setidToken("")
    instance.acquireTokenSilent({
      ...tokenRequest,
      account: accounts[0],
    }).then(response => {
      if (response.accessToken) {
        console.log(response.accessToken)
        setidToken(response.idToken)
        setaccToken(response.accessToken)
        setTokenStatus("Acquired Token silently")

        //callAPI(response.accessToken)

      }
      else
      {
        setaccToken("")
        setTokenStatus("Failed token acquisition\n")  
      }

    }).catch(error => {
      setTokenStatus("Failed token acquisition\n")
      console.error("Error in token acquisition: " + error);
    });
    
  }
  

  return (
    //   <div>
    //       Hello
    //       <AuthenticatedTemplate>
    //       Some user is signed in.
    //       </AuthenticatedTemplate>
    //       <UnauthenticatedTemplate>
    //         <p>No user is signed in</p>
    //        </UnauthenticatedTemplate>

    // </div>

    <div style={{ display: 'flex', flexDirection: 'column'}}>
      
      <div style={{ display: 'flex', flexDirection: 'row', paddingBottom: '10px', paddingTop: '10px'}}>
        <div style={{flexGrow: 0, flexBasis: '12em'}}><Button onClick={GetTokens}>Get Access Token </Button></div>
        <div style={{flexGrow: 0, }}><Text>{tokenStatus}</Text></div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', paddingBottom: '10px'}}>
        <div style={{flexGrow: 0,  flexBasis: '12em'}}><Text color="primary" >Access Token</Text></div>
        <div className="nobreak" style={{maxHeight: 200, width: 500, overflow: 'auto', flexGrow: 1, padding: '10px'}}> 
            {accToken}
        </div>
      </div>

      {/* <div style={{ display: 'flex', flexDirection: 'row'}}>
        <div style={{flexGrow: 0, padding: '10px', flexBasis: '8em'}}><Typography variant="overline">ID Token</Typography></div>
        <div className="nobreak" style={{maxHeight: 200, width: 300, overflow: 'auto',  flexGrow: 1, padding: '10px'}}>
            {idToken}
        </div> 
      </div> */}


    </div>
  )
}

export default UserTokens