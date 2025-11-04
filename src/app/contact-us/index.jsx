import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { APP_CONFIG } from "@/utils/constants";
import styles from "./index.module.scss";

// Store Name Placeholder
const STORE_NAME = APP_CONFIG.APP_FULL_NAME;

// Component to embed all custom CSS styles (copied for consistent styling)
const CustomStyles = () => (
  <style>
    {`
      /* -------------------------------------- */
      /* Base Styles */
      /* -------------------------------------- */
      .helpContainer {
        min-height: 100vh;
        // background-color: #f9fafb; /* Very light gray background for contrast */
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        font-family: 'Inter', sans-serif;
        color: #000; /* Set base text color to black */
      }
      @media (min-width: 640px) {
        .helpContainer {
          padding: 2rem;
        }
      }

      /* -------------------------------------- */
      /* Header/Title Area */
      /* -------------------------------------- */
      .helpHeaderArea {
        width: 100%;
        max-width: 900px;
        text-align: center;
        margin-bottom: 2rem;
        padding: 2rem 1rem;
        background-color: #ffffff; /* Simplified to pure white */
        border-radius: 1rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      }
      .helpTitle {
        font-size: 2.5rem;
        font-weight: 800;
        color: #000; /* Updated to black */
        margin-bottom: 0.5rem;
      }
      .helpSubtitle {
        font-size: 1.125rem;
        color: #444; /* Dark gray for secondary text */
        margin-bottom: 1.5rem;
      }

      /* -------------------------------------- */
      /* Main Content Card (Form/Methods Container) */
      /* -------------------------------------- */
      .mainContentCard {
        width: 100%;
        max-width: 900px;
        background-color: #ffffff; /* Pure white content card */
        border-radius: 1rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        padding: 2rem;
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      @media (min-width: 768px) {
        .mainContentCard {
          grid-template-columns: 2fr 1fr; /* Form on left, methods on right */
        }
      }

      /* -------------------------------------- */
      /* Form Styles */
      /* -------------------------------------- */
      .contactForm {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .formGroup {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .formGroup label {
        font-weight: 600;
        color: #000;
        font-size: 0.9rem;
      }
      .formGroup input, .formGroup textarea {
        padding: 0.75rem 1rem;
        border: 1px solid #e0e7ff;
        border-radius: 0.5rem;
        font-size: 1rem;
        outline: none;
        transition: border-color 0.3s, box-shadow 0.3s;
        // background-color: #f9fafb;
      }
      .formGroup input:focus, .formGroup textarea:focus {
        border-color: #bababaff;
        box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
        background-color: #ffffff;
      }
      .formGroup textarea {
        resize: vertical;
        min-height: 100px;
      }
      .submitButton {
        padding: 0.75rem 1.5rem;
        background-color: #000000ff; /* Primary accent color */
        color: #ffffff;
        border: none;
        border-radius: 0.5rem;
        font-weight: 700;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.1s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
      }
      .submitButton:hover {
        background-color: #707070ff;
      }
      .submitButton:active {
        transform: scale(0.99);
      }
      
      .linkIcon {
        color: #000; /* UPDATED to black */
        margin-bottom: 0.5rem;
        margin-left: auto; /* Center the icon in the header */
        margin-right: auto;
      }
      
      /* Success Message */
      .successMessage {
        padding: 1rem;
        background-color: #dcfce7; /* Light green */
        color: #15803d; /* Dark green text */
        border: 1px solid #bbf7d0;
        border-radius: 0.5rem;
        font-weight: 600;
        text-align: center;
        margin-top: 1rem;
      }


      /* -------------------------------------- */
      /* Contact Methods Section */
      /* -------------------------------------- */
      .contactMethods {
        padding: 1.5rem;
        background-color: #f3f4f6; /* Subtle gray background */
        border-radius: 0.75rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      .methodsHeading {
        font-size: 1.25rem;
        font-weight: 700;
        color: #000;
        margin-bottom: 0.5rem;
        border-bottom: 1px solid #e5e7eb;
        padding-bottom: 0.5rem;
      }
      .methodItem {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
      }
      .methodIconCircle {
        padding: 0.6rem;
        background-color: #000000ff; /* Accent color for pop */
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .methodIconCircle svg {
        color: #ffffff;
      }
      .methodDetails h4 {
        font-weight: 600;
        color: #000;
        margin-bottom: 0.25rem;
      }
      .methodDetails p, .methodDetails a {
        font-size: 0.95rem;
        color: #444;
        line-height: 1.4;
      }
      .methodDetails a:hover {
        color: #4f46e5;
        text-decoration: underline;
      }

      /* -------------------------------------- */
      /* Footer Styles */
      /* -------------------------------------- */
      .mainFooter {
        margin-top: 2rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
        width: 100%;
        max-width: 1024px;
        text-align: center;
        font-size: 0.875rem;
        color: #444; /* Dark gray for footer text */
        border-top: 1px solid #e5e7eb;
      }
    `}
  </style>
);

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500); //TODO send really
  };

  return (
    <>
      <section className={styles.nav_section}></section>
      <section className={styles.section}>
        <div className="helpContainer">
          {/* Embed the custom styles */}
          <CustomStyles />

          <header className="helpHeaderArea">
            <Send className="linkIcon" size={48} />
            <h2 className="helpTitle">Contact {STORE_NAME} Support</h2>
            <p className="helpSubtitle">
              Have a question or need assistance? Fill out the form below and
              we'll get back to you within 24 hours.
            </p>
          </header>

          {/* Main Content Card with Form and Contact Methods */}
          <section className="mainContentCard">
            {/* Contact Form */}
            <div>
              <h3>Send Us a Message</h3>

              {isSubmitted && (
                <div className="successMessage">
                  Thank you! Your message has been sent successfully. We will be
                  in touch soon.
                </div>
              )}

              <form className="contactForm" onSubmit={handleSubmit}>
                <div className="formGroup">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="formGroup">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="formGroup">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="formGroup">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="submitButton"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Alternative Contact Methods */}
            <div className="contactMethods">
              <h3 className="methodsHeading">Other Ways to Connect</h3>

              <div className="methodItem">
                <div className="methodIconCircle">
                  <Mail size={20} />
                </div>
                <div className="methodDetails">
                  <h4>Email Support</h4>
                  <p>Send us an email for general inquiries.</p>
                  <a href={"mailto:" + APP_CONFIG.CONTACT_EMAIL}>
                    {APP_CONFIG.CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="methodItem">
                <div className="methodIconCircle">
                  <Phone size={20} />
                </div>
                <div className="methodDetails">
                  <h4>Call Us</h4>
                  <p>Available Mon - Fri, 9am - 5pm IST</p>
                  <a href={"tel:" + APP_CONFIG.CONTACT_PHONE}>
                    {APP_CONFIG.CONTACT_PHONE}
                  </a>
                </div>
              </div>

              <div className="methodItem">
                <div className="methodIconCircle">
                  <MapPin size={20} />
                </div>
                <div className="methodDetails">
                  <h4>Visit Our HQ</h4>
                  <p>For returns or local pickups (by appointment only).</p>
                  <p>{APP_CONFIG.ADDRESS}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
