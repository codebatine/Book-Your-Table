import { useContext } from "react";
import { ContactForm } from "../components/form/ContactForm";
import { aboutUs, contactData } from "../data/contactData";
import { WalletContext } from "../context/WalletContext";
import bitcoinLogo from '../content/img/bitcoin-logo.png';
import moneroLogo from '../content/img/monero-logo.png';
import ethereumLogo from '../content/img/ethereum-logo.png';

export const Contact = () => {
  const { isConnected } = useContext(WalletContext);

  return (
    <div className="container">
      <h1>Contact</h1>
      <div className="container-contact">
        <p>Address: {contactData.address}</p>
        <p>Stad: {contactData.city}</p>
        <p>Postnummer: {contactData.zip}</p>
        <p>Telefon nr: {contactData.phone}</p>
        <p>Email: {contactData.email}</p>
      </div>

      {isConnected ? (
        <ContactForm />
      ) : (
        <p>Connect wallet if you want to send a message</p>
      )}

      <div className="container-contact">
        <h2>About us</h2>
        <ul>
          {aboutUs.names.map((worker, i) => {
            return <li key={i}>{worker}</li>;
          })}
        </ul>
        <p>{aboutUs.description}</p>
        <p>Opening hours: {aboutUs.hours}</p>
        <p>Here you can pay with</p>{" "}
        {aboutUs.Currency.map((crypto, i) => (
          <span key={i}>{crypto}</span>
        ))}
        <br />
        <div className="crypto-logos">
          <img src={bitcoinLogo} alt="Bitcoin Logo" />
          <img src={ethereumLogo} alt="Ethereum Logo" />
          <img src={moneroLogo} alt="Monero Logo" />
        </div>
        We do not accept filthy fiat money
      </div>
    </div>
  );
};
