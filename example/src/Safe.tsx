import {useParams} from 'react-router-dom';
import axios from 'axios';
import AppBar from './AppBar';
import { useEffect, useState } from 'react'
import { SafeEventEmitterProvider } from '@web3auth/base'
import { SafeAuthKit, SafeAuthProviderType, SafeAuthClient, SafeAuthSignInData } from '../../src/index'

export function Safe() { 
    const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState<SafeAuthSignInData | null>(
        null
      )
      const [safeAuth, setSafeAuth] = useState<SafeAuthKit>()
      const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null)
      const [data, setData] = useState<any>()
   
  useEffect(() => {
    ;(async () => {
      setSafeAuth(
        await SafeAuthKit.init(SafeAuthProviderType.Web3Auth, {
          chainId: '0x5',
          txServiceUrl: 'https://safe-transaction-goerli.safe.global', // Optional. Only if want to retrieve related safes
          authProviderConfig: {
            rpcTarget: `https://goerli.infura.io/v3/${import.meta.env.VITE_INFURA_KEY}`,
            clientId: import.meta.env.VITE_WEB3AUTH_CLIENT_ID || '',
            network: 'testnet',
            theme: 'dark'
          }
        })
      )
    })()
  }, [])    

  const login = async () => {
    if (!safeAuth) return

    const response = await safeAuth.signIn()
    console.log('SIGN IN RESPONSE: ', response)

    setSafeAuthSignInResponse(response)
    setProvider(safeAuth.getProvider() as SafeEventEmitterProvider)
  }

  const logout = async () => {
    if (!safeAuth) return

    await safeAuth.signOut()

    setProvider(null)
    setSafeAuthSignInResponse(null)
  }
    
    const getData = async () => {
        const response = await axios.get(`https://safe-transaction-goerli.safe.global/api/v1/safes/${id}/
        `) 
        setData(response.data.owners);
    }
   

    const { id } = useParams();
    return (
      <div className='container'>
       <AppBar onLogin={login} onLogout={logout} isLoggedIn={!!provider} />
      <div>
        <h1>SafeId {id}</h1>
        <button className='btn1' onClick={()=>{getData()}}>Get Data</button>
        {data[1]}
     
      </div> 
   </div> );
};