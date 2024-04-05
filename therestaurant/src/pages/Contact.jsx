import { useContext } from "react";
import { ContactForm } from "../components/form/ContactForm";
import { aboutUs, contactData } from "../data/contactData";
import { WalletContext } from "../context/WalletContext";

export const Contact = () => {
  const { isConnected } = useContext(WalletContext);

  return (
    <div className="contact-page">
      <div className="contact-contianer">
        <h1>Contact</h1>
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

      <div className="about-container">
        <h1>About us</h1>
        <ul>
          {aboutUs.names.map((worker, i) => {
            return <li key={i}>{worker}</li>;
          })}
        </ul>
        <p>{aboutUs.description}</p>
        <p>Opening hours: {aboutUs.hours}</p>
        <p>
          Here you can pay with{" "}
          {aboutUs.Currency.map((crypto, i) => (
            <span key={i}>{crypto}</span>
          ))}
          <br />
          We do not accept filty fiat money
        </p>
      </div>
    </div>
  );
};
