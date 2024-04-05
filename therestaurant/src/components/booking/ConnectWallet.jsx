import React from 'react'

export const ConnectWallet = ({connectWallet, wallet}) => {
  return (
    <div className="connect-wallet-wrapper">
      <span>{wallet}</span>
      <button onClick={connectWallet}>Connect</button>
    </div>
  )
}
