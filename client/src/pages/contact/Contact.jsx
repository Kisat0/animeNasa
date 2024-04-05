import FormContact from "../../components/formContact/FormContact";
import Navbar from "../../components/navbar/Navbar";
import "./Contact.scss";

import { ThemeProvider, createTheme } from "@mui/material";

const ContactPage = () => {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    return (
        <div>
            <Navbar />
            <img src="https://images.squarespace-cdn.com/content/v1/5fe4caeadae61a2f19719512/1612118642528-NNKDQ94C5US2B4KZEO2V/Naruto17.jpg" className="backgroundContact" />
            <div className="globalContact">
                <h1 className="contact-title">Contactez-nous</h1>
                <div className="containeur-form-contact">
                    <ThemeProvider theme={darkTheme}>
                        <FormContact />
                    </ThemeProvider>
                </div>

            </div>
        </div>
    )
}
export default ContactPage; 