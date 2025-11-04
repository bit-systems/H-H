import React from "react";
import { Shield } from "lucide-react";
import styles from "./index.module.scss";
import { APP_CONFIG } from "@/utils/constants";

// Store Name Placeholder
const STORE_NAME = APP_CONFIG.FULL_REGISTERED_COMPANY_NAME;

// Component to embed all custom CSS styles (Copied for consistent styling)
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
      /* Main Content Card (Policy Container) */
      /* -------------------------------------- */
      .mainContentCard {
        width: 100%;
        max-width: 900px;
        background-color: #ffffff; /* Pure white content card */
        border-radius: 1rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        padding: 2rem;
        line-height: 1.6; /* Improved readability for long text */
      }

      /* -------------------------------------- */
      /* Policy Text Styles */
      /* -------------------------------------- */
      .policySection {
        margin-bottom: 2rem;
      }
      .policySection h3 {
        font-size: 1.5rem;
        font-weight: 700;
        color: #000;
        margin-bottom: 0.75rem;
        border-bottom: 2px solid #e5e7eb;
        padding-bottom: 0.5rem;
      }
      .policySection h4 {
        font-size: 1.125rem;
        font-weight: 600;
        color: #000;
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
      }
      .policySection p {
        color: #333; /* Dark gray for body text */
        margin-bottom: 1rem;
      }
      .policySection ul {
        list-style-type: disc;
        margin-left: 1.5rem;
        color: #333;
        margin-bottom: 1rem;
      }
      .policySection li {
        margin-bottom: 0.5rem;
      }
      
      .linkIcon {
        color: #000; /* UPDATED to black */
        margin-bottom: 0.5rem;
        margin-left: auto; 
        margin-right: auto;
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

const PrivacyPolicy = () => {
  const lastUpdatedDate = "September 27, 2025";

  return (
    <>
      <section className={styles.nav_section}></section>
      <section className={styles.section}>
        <div className="helpContainer">
          {/* Embed the custom styles */}
          <CustomStyles />

          <header className="helpHeaderArea">
            <Shield className="linkIcon" size={48} />
            <h2 className="helpTitle">Privacy Policy</h2>
            <p className="helpSubtitle">Last Updated: {lastUpdatedDate}</p>
          </header>

          {/* Main Content Card with Policy Text */}
          <section className="mainContentCard">
            <div className="policySection">
              <h3>1. Introduction</h3>
              <p>
                Welcome to {STORE_NAME}. We are committed to protecting your
                privacy and personal information. This policy describes how we
                collect, use, and share your personal data when you use our
                website, purchase products, or contact our customer service. By
                using our services, you consent to the data practices described
                in this policy.
              </p>
            </div>

            <div className="policySection">
              <h3>2. Information We Collect</h3>
              <p>
                We collect information you provide directly to us, information
                collected automatically, and information from third parties.
              </p>

              <h4>Information You Provide Directly</h4>
              <p>
                This includes data you submit when you create an account, place
                an order, sign up for marketing emails, or interact with
                customer service. This may include:
              </p>
              <ul>
                <li>
                  <strong>Identification Data:</strong> Name, email address,
                  shipping address, and phone number.
                </li>
                <li>
                  <strong>Transaction and Financial Data:</strong> Details about
                  purchases, payment information (collected and processed
                  securely by third-party payment gateways), and shipping
                  details.
                </li>
                <li>
                  <strong>Marketing and Preference Data:</strong> Your
                  preferences in receiving marketing from us, and sizes/styles
                  you have viewed or saved.
                </li>
              </ul>

              <h4>Information Collected Automatically</h4>
              <p>
                When you visit or use our services, we automatically collect
                device and usage data, often through cookies and similar
                technologies. This data is essential for our business and
                marketing practices:
              </p>
              <ul>
                <li>
                  <strong>Device Information:</strong> IP address, device type,
                  operating system, unique device identifiers, and browser type.
                </li>
                <li>
                  <strong>Usage Data:</strong> Pages viewed, products viewed,
                  time spent on the site, referring site, and clickstream data.
                </li>
                <li>
                  <strong>Location Data:</strong> Approximate location derived
                  from your IP address for analytics and fraud prevention.
                </li>
              </ul>
            </div>

            <div className="policySection">
              <h3>3. Cookies and Tracking Technologies</h3>
              <p>
                We use cookies, web beacons, and other tracking technologies to
                enhance your shopping experience, analyze site usage, and
                support our advertising efforts. These technologies help us:
              </p>
              <ul>
                <li>Remember items in your shopping cart.</li>
                <li>Authenticate you on repeat visits.</li>
                <li>Analyze traffic patterns and customer behavior.</li>
                <li>
                  Provide relevant advertisements on our site and across the
                  internet.
                </li>
              </ul>
            </div>

            <div className="policySection">
              <h3>4. How We Use Your Information</h3>
              <p>
                We use the collected information for four main categories of
                business purposes:
              </p>

              <h4>Service Delivery and Operations</h4>
              <ul>
                <li>
                  Fulfilling your orders, processing payments, and managing
                  returns.
                </li>
                <li>
                  Communicating with you about your order status and service
                  announcements.
                </li>
                <li>Managing your account and providing customer support.</li>
              </ul>

              <h4>Personalization and Marketing</h4>
              <ul>
                <li>
                  **Product Recommendations:** Using your viewing history and
                  purchase data to recommend relevant apparel.
                </li>
                <li>
                  **Personalized Content:** Customizing the website layout and
                  content based on your known preferences (e.g., showing women's
                  wear if you frequently browse that category).
                </li>
                <li>
                  **Direct Marketing:** Sending promotional emails and offers
                  based on your subscription preferences and purchase history.
                </li>
              </ul>

              <h4>Advertising and Analytics</h4>
              <ul>
                <li>
                  **Interest-Based Advertising:** Working with third-party
                  partners to show you targeted ads for our products on other
                  websites and social media platforms.
                </li>
                <li>
                  **Performance Tracking:** Measuring the effectiveness of our
                  campaigns and site performance.
                </li>
                <li>
                  **Analytics:** Analyzing site traffic and customer paths to
                  improve site usability and product offerings.
                </li>
              </ul>
            </div>

            <div className="policySection">
              <h3>5. Sharing of Information</h3>
              <p>
                We do not sell or rent your personal information to third
                parties. We may share your information with:
              </p>
              <ul>
                <li>
                  <strong>Service Providers:</strong> Third parties who perform
                  services on our behalf (e.g., payment processors, shipping
                  carriers, email providers).
                </li>
                <li>
                  <strong>Advertising and Marketing Partners:</strong>{" "}
                  Third-party ad platforms (like Google or Meta) to provide
                  personalized advertising services, where information like your
                  IP address or hashed email may be shared.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> To comply with legal
                  obligations, enforce our terms of service, or protect our
                  rights.
                </li>
              </ul>
            </div>

            <div className="policySection">
              <h3>6. Personalized Advertising and Your Choices</h3>
              <p>
                We partner with third-party advertisers to deliver
                interest-based advertisements to you. You have choices regarding
                how your information is used for this purpose:
              </p>
              <ul>
                <li>
                  **Cookie Settings:** Most web browsers are set to accept
                  cookies by default. You can usually choose to set your browser
                  to remove or reject browser cookies.
                </li>
                <li>
                  **Opt-Out Tools:** You can opt-out of many third-party
                  advertising networks using tools provided by the Network
                  Advertising Initiative (
                  <a
                    href="http://www.networkadvertising.org/managing/opt_out.asp"
                    target="_blank"
                    style={{ color: "#4f46e5", textDecoration: "underline" }}
                  >
                    NAI
                  </a>
                  ) and the Digital Advertising Alliance (
                  <a
                    href="http://www.aboutads.info/choices"
                    target="_blank"
                    style={{ color: "#4f46e5", textDecoration: "underline" }}
                  >
                    DAA
                  </a>
                  ).
                </li>
              </ul>
            </div>

            <div className="policySection">
              <h3>7. Your Rights</h3>
              <p>
                You have the right to access, correct, or delete your personal
                data held by us. If you have an account, you can manage much of
                your information directly through your account settings. For all
                other requests, please contact us using the details below.
              </p>
            </div>

            <div className="policySection">
              <h3>8. Contact Information</h3>
              <p>
                If you have questions or comments about this policy, please
                contact us at:
              </p>
              <p>
                Email:{" "}
                <a
                  href={"mailto:" + APP_CONFIG.CONTACT_EMAIL}
                  style={{ color: "#4f46e5", textDecoration: "underline" }}
                >
                  {APP_CONFIG.CONTACT_EMAIL}
                </a>
              </p>
              <p>
                Mail: {STORE_NAME} {APP_CONFIG.ADDRESS}
              </p>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
