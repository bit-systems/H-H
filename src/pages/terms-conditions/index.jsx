import React from "react";
import { FileText } from "lucide-react";

import styles from "./index.module.scss";
import { APP_CONFIG } from "@/utils/constants";

const STORE_NAME = APP_CONFIG.FULL_REGISTERED_COMPANY_NAME;
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

const TermsAndConditions = () => {
  const effectiveDate = "October 1, 2025";

  return (
    <>
      <section className={styles.nav_section}></section>
      <section className={styles.section}>
        <div className="helpContainer">
          {/* Embed the custom styles */}
          <CustomStyles />

          <header className="helpHeaderArea">
            <FileText className="linkIcon" size={48} />
            <h2 className="helpTitle">Terms & Conditions</h2>
            <p className="helpSubtitle">Effective Date: {effectiveDate}</p>
          </header>

          {/* Main Content Card with T&C Text */}
          <section className="mainContentCard">
            <div className="policySection">
              <h3>1. Acceptance of Terms (Electronic Contract)</h3>
              <p>
                By accessing or using the website of {STORE_NAME} ("we," "us,"
                or "our"), you agree to be bound by these Terms and Conditions
                ("Terms"). These Terms constitute an **electronic record** in
                accordance with the provisions of the Information Technology
                Act, 2000 and the rules thereunder. By using the services, you
                confirm that you are at least 18 years of age or accessing the
                site under the supervision of a parent or guardian.
              </p>
            </div>

            <div className="policySection">
              <h3>2. User Account, Security, and Password</h3>
              <p>
                If you register on the website, you are responsible for
                maintaining the confidentiality of your account and password and
                for restricting access to your computer. You agree to accept
                responsibility for all activities that occur under your account
                or password. We reserve the right to refuse service, terminate
                accounts, or cancel orders at our sole discretion.
              </p>
            </div>

            <div className="policySection">
              <h3>3. Product Information and Accuracy</h3>
              <p>
                We strive to be as accurate as possible in the description and
                colors of our products (apparel). However, due to factors like
                screen settings and lighting, we cannot guarantee that the color
                you see on your monitor will exactly match the product's actual
                color.
              </p>
              <ul>
                <li>
                  <strong>Measurements and Fit:</strong> Size charts are
                  provided as a guide. The fit of a garment may vary depending
                  on the style, cut, and material. Minor variations in
                  measurement (within 1-2 cm) are common in garment production
                  and will not constitute a defect.
                </li>
                <li>
                  <strong>Weight and Quantity:</strong> All weights,
                  measurements, and sizes mentioned are approximate.
                </li>
              </ul>
            </div>

            <div className="policySection">
              <h3>4. Pricing, Payment, and Order Acceptance</h3>
              <p>
                All prices are listed in <b>Indian Rupees (INR)</b> and include
                applicable taxes (GST), as required by law.
              </p>
              <ul>
                <li>
                  <strong>Pricing Errors:</strong> If a product is listed at an
                  incorrect price, we reserve the right to refuse or cancel any
                  orders placed for that product at the incorrect price, even if
                  the order has been confirmed.
                </li>
                <li>
                  <strong>Payment:</strong> Payments are processed via secure
                  third-party payment gateways. You agree to pay the full price
                  for all products purchased.
                </li>
              </ul>
            </div>

            <div className="policySection">
              <h3>5. Shipping and Delivery</h3>
              <p>
                Shipping timelines provided are estimates. We are not liable for
                delays in delivery caused by our logistics partners or events
                outside our control (e.g., natural disasters, public holidays,
                political disruptions). Risk of loss and title for items
                purchased pass to you upon delivery of the items to the carrier.
              </p>
            </div>

            <div className="policySection">
              <h3>6. Returns Policy and Eligibility</h3>
              <p>
                We accept returns for items within 7 days of delivery, provided
                the item meets the following strict eligibility criteria:
              </p>
              <ul>
                <li>The item is unused, unwashed, and undamaged.</li>
                <li>
                  The item is in its original condition with all **original
                  tags, price tags, and packaging intact**.
                </li>
                <li>
                  The item is not marked as "Final Sale," "Non-Returnable," or
                  falls under hygiene exceptions (e.g., innerwear, socks,
                  accessories).
                </li>
                <li>
                  The return request is initiated through your account dashboard
                  or by contacting customer support within the stipulated
                  period.
                </li>
              </ul>
              <p>
                Failure to meet these conditions may result in the rejection of
                the return and the item being shipped back to you at your
                expense.
              </p>
            </div>

            <div className="policySection">
              <h3>7. Exchanges Process</h3>
              <p>
                We facilitate exchanges primarily for reasons of size or color,
                subject to product availability and adherence to the eligibility
                criteria in Section 6.
              </p>
              <ul>
                <li>
                  <strong>Exchange Request:</strong> You must specify the
                  desired replacement size or color when initiating the exchange
                  request.
                </li>
                <li>
                  <strong>Processing:</strong> Exchanges are processed only
                  after the original item is received and passes our quality
                  inspection.
                </li>
                <li>
                  <strong>Availability:</strong> If the requested exchange item
                  is out of stock, we will automatically process a refund as per
                  Section 8.
                </li>
              </ul>
            </div>

            <div className="policySection">
              <h3>8. Refunds Process</h3>
              <p>
                Refunds are applicable only after a return has been successfully
                inspected and accepted by our quality control team. The refund
                amount will exclude any initial shipping charges unless the
                return is due to our error (e.g., wrong or defective product).
              </p>
              <ul>
                <li>
                  <strong>Prepaid Orders:</strong> Refunds for orders paid via
                  credit card, debit card, or net banking will be credited back
                  to the original source of payment within 7-10 working days.
                </li>
                <li>
                  <strong>Cash on Delivery (COD) Orders:</strong> Refunds for
                  COD orders will be issued via bank transfer (NEFT) to the bank
                  account details provided by you. This process may take
                  additional time for verification.
                </li>
                <li>
                  <strong>Store Credit:</strong> In certain scenarios, we may
                  offer store credit, which can be redeemed on future purchases.
                </li>
              </ul>
            </div>

            <div className="policySection">
              <h3>9. Limitation of Liability and Indemnification</h3>
              <p>
                To the fullest extent permitted by law, {STORE_NAME} shall not
                be liable for any indirect, incidental, or consequential damages
                resulting from the use or the inability to use the services. You
                agree to indemnify, defend, and hold harmless {STORE_NAME}{" "}
                against any claims, liabilities, or expenses arising from your
                violation of these Terms.
              </p>
            </div>

            <div className="policySection">
              <h3>10. Changes to Terms</h3>
              <p>
                We reserve the right to change these Terms at any time. We will
                notify users of any material changes by posting the new Terms on
                this page. Your continued use of the website constitutes
                acceptance of the revised Terms.
              </p>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default TermsAndConditions;
