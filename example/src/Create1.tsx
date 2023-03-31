import { useEffect, useState } from 'react'
import { SafeEventEmitterProvider } from '@web3auth/base'
import { SafeAuthKit, SafeAuthProviderType, SafeAuthClient, SafeAuthSignInData } from '../../src/index'
import { ethers } from 'ethers'
import EthersAdapter from '@safe-global/safe-ethers-lib'
import SafeServiceClient from '@safe-global/safe-service-client'
import { SafeFactory } from '@safe-global/safe-core-sdk'
import { SafeAccountConfig } from '@safe-global/safe-core-sdk'
import IssueSafe from './components/transac'

import AppBar from './AppBar'

export function Create() {
  const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState<any>(
    null
  )
  const [safeAuth, setSafeAuth] = useState<SafeAuthKit>()
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null)


async function createSafe() {

  try {
    const prov = new ethers.providers.Web3Provider(window.ethereum)
        const signer = prov.getSigner();
         const ethAdapterCreator = new EthersAdapter({
           ethers,
           signerOrProvider: signer
         })
       
    const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterCreator });

    const owners = [  "0x64609cB678BfF00898CF636eEe8e32865EE3Ac38",
    "0xa98c3f1c91dc95BeB90431C9F553eaF222459A58"];
    const threshold = 2;
    const safeAccountConfig: SafeAccountConfig = {
      owners,
      threshold
    };

    const teamSafe = await safeFactory.deploySafe({ safeAccountConfig })

    const safeAddress = teamSafe.getAddress()
    console.log(safeAddress);
  } finally {
    console.log("safe created")
  }
}
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

  return (
    <div className='container'>
      <AppBar onLogin={login} onLogout={logout} isLoggedIn={!!provider} />
      {console.log(safeAuthSignInResponse)}
      
      {safeAuthSignInResponse?.eoa && (
        <div>
          <IssueSafe yourAddress={safeAuthSignInResponse.eoa} previousSafes={safeAuthSignInResponse.safes} onSubmit={()=>{createSafe()}} />
        </div>
      )}
    </div>
  )
}



