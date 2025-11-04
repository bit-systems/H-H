import React, { useEffect, useState } from "react";
import {
  Search,
  ChevronDown,
  Truck,
  RotateCcw,
  HelpCircle,
  Ruler,
} from "lucide-react";
import { APP_CONFIG } from "@/utils/constants";
import styles from "./index.module.scss";

// Store Name Placeholder

const STORE_NAME = APP_CONFIG.APP_FULL_NAME;

const faqData = [
  {
    id: 1,
    category: "shipping",
    question: "What are your shipping options and delivery times?",
    answer: `We offer standard shipping (5-7 business days) and express shipping (2-3 business days). All orders are processed within 48 hours. You will receive a tracking link via email once your order ships.`,
  },
  {
    id: 2,
    category: "returns",
    question: "What is your return and exchange policy?",
    answer: `We accept returns and exchanges on unworn and unwashed items within 7 days of purchase. Items must have original tags attached. Final sale items are not eligible for return.`,
  },
  {
    id: 3,
    category: "sizing",
    question: "How do I determine my correct size?",
    answer: `Please refer to our comprehensive Size Guide available on every product page. If you are still unsure, contact our support team for personalized fitting advice!`,
  },
  {
    id: 4,
    category: "shipping",
    question: "Do you ship internationally?",
    answer: `Yes, we proudly ship to over 50 countries worldwide! International shipping rates and times are calculated at checkout based on the destination.`,
  },
  {
    id: 5,
    category: "shipping",
    question: "How can I update my order or shipping address?",
    answer: `If you need to make a change, please contact us immediately. Once an order enters the shipping process (usually within 2 hours), we cannot guarantee changes can be made.`,
  },
];

// Component to embed all custom CSS styles
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
      /* Search Bar */
      /* -------------------------------------- */
      .searchBarWrapper {
        position: relative;
        max-width: 600px;
        margin: 0 auto;
      }
      .searchInput {
        width: 100%;
        padding: 0.75rem 1rem 0.75rem 3rem;
        border: 2px solid #e0e7ff;
        border-radius: 9999px; /* Fully rounded */
        font-size: 1rem;
        outline: none;
        transition: border-color 0.3s, box-shadow 0.3s;
      }
      .searchInput:focus {
        border-color: #4f46e5; /* Accent color for focus ring */
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
      }
      .searchIcon {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: #9ca3af;
      }

      /* -------------------------------------- */
      /* Main Content Card */
      /* -------------------------------------- */
      .mainContentCard {
        width: 100%;
        max-width: 900px;
        background-color: #ffffff; /* Pure white content card */
        border-radius: 1rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        padding: 2rem;
      }

      /* -------------------------------------- */
      /* Quick Links Navigation */
      /* -------------------------------------- */
      .quickLinksTitle {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: #000; /* Updated to black */
        border-bottom: 2px solid #e0e7ff;
        padding-bottom: 0.5rem;
      }
      .quickLinksGrid {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 1rem;
        margin-bottom: 3rem;
      }
      @media (min-width: 640px) {
        .quickLinksGrid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      .quickLinkCard {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 1.5rem;
        border: 1px solid #e0e7ff;
        border-radius: 0.75rem;
        transition: background-color 0.3s, border-color 0.3s, box-shadow 0.3s;
        cursor: pointer; /* Ensure pointer shows for interaction */
      }
      .quickLinkCard:hover {
        background-color: #f5f3ff;
        border-color: #4f46e5;
      }
      .quickLinkCard.active { /* Style for active filter */
        background-color: #eef2ff;
        border-color: #4f46e5;
        box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.3);
      }

      .linkIcon {
        color: #000; /* UPDATED to black */
        margin-bottom: 0.5rem;
        margin-left: auto; /* Center the icon in the header */
        margin-right: auto;
      }
      .linkText {
        font-weight: 600;
        color: #000; /* Set link text to black */
      }

      /* -------------------------------------- */
      /* FAQ Section */
      /* -------------------------------------- */
      .faqHeading {
        font-size: 1.75rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        color: #000; /* Updated to black */
        text-align: center;
      }
      .faqList {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      .faqItem {
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        overflow: hidden;
        background-color: #ffffff;
        transition: box-shadow 0.3s;
      }
      .faqItem.open {
         box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      }
      .faqQuestion {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.5rem;
        font-size: 1rem;
        font-weight: 600;
        text-align: left;
        // background-color: #f9fafb;
        border: none;
        cursor: pointer;
        transition: background-color 0.2s;
        color: #000; /* Set question text to black */
      }
      .faqItem.open .faqQuestion {
        background-color: #eef2ff;
        color: #3730a3; /* Keeping dark indigo accent for open state for visibility */
      }
      .faqQuestion:hover {
        background-color: #e5e7eb;
      }
      .chevronIcon {
        transition: transform 0.3s;
      }
      .faqItem.open .chevronIcon {
        transform: rotate(180deg);
      }
      .faqAnswer {
        max-height: 0;
        overflow: hidden;
        padding: 0 1.5rem;
        transition: max-height 0.4s ease-out, padding 0.4s ease-out;
        color: #333; /* Dark gray for body text contrast */
        line-height: 1.6;
      }
      .faqItem.open .faqAnswer {
        max-height: 200px;
        padding: 1rem 1.5rem 1.5rem;
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

const HelpCenter = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState([]);

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  // Function to set the filter category and clear search term
  const handleCategoryFilter = (category) => {
    const newFilter = categoryFilter === category ? "" : category;
    setCategoryFilter(newFilter);
    setSearchTerm(""); // Clear search when a category is selected
    setActiveFaq(null); // Close any open FAQ items
  };

  useEffect(() => {
    const filteredFaqs = faqData.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Check if the category matches the filter (or if no filter is set)
      const matchesCategory =
        categoryFilter === "" || faq.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });

    setFilteredFaqs(filteredFaqs);
  }, [searchTerm]);

  return (
    <>
      <section className={styles.nav_section}></section>
      <section className={styles.section}>
        <div className="helpContainer">
          {/* Embed the custom styles */}
          <CustomStyles />

          <header className="helpHeaderArea">
            {/* Note: Added margin auto styling directly in CSS for centering since Tailwind is not available */}
            <HelpCircle className="linkIcon" size={48} />
            <h2 className="helpTitle">{STORE_NAME} Help Center</h2>
            <p className="helpSubtitle">
              How can we help you today? Search for immediate answers or browse
              our popular topics.
            </p>

            {/* Search Bar */}
            <div className="searchBarWrapper">
              <Search className="searchIcon" size={20} />
              <input
                type="text"
                placeholder="Search for shipping, returns, or sizing..."
                className="searchInput"
                value={searchTerm}
                // Clear category filter when the user starts typing
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCategoryFilter("");
                  setActiveFaq(null);
                }}
              />
            </div>
          </header>

          {/* Main Content Card */}
          <section className="mainContentCard">
            {/* Quick Links */}
            <h3 className="quickLinksTitle">Quick Access</h3>
            <div className="quickLinksGrid">
              {/* Shipping Link */}
              <div
                className={`quickLinkCard ${
                  categoryFilter === "shipping" ? "active" : ""
                }`}
                onClick={() => handleCategoryFilter("shipping")}
                role="button"
                aria-label="Filter FAQs by Shipping"
              >
                <Truck className="linkIcon" size={24} />
                <span className="linkText">Shipping & Tracking</span>
              </div>

              {/* Returns Link */}
              <div
                className={`quickLinkCard ${
                  categoryFilter === "returns" ? "active" : ""
                }`}
                onClick={() => handleCategoryFilter("returns")}
                role="button"
                aria-label="Filter FAQs by Returns"
              >
                <RotateCcw className="linkIcon" size={24} />
                <span className="linkText">Returns & Exchanges</span>
              </div>

              {/* Sizing Link */}
              <div
                className={`quickLinkCard ${
                  categoryFilter === "sizing" ? "active" : ""
                }`}
                onClick={() => handleCategoryFilter("sizing")}
                role="button"
                aria-label="Filter FAQs by Sizing and Fit"
              >
                <Ruler className="linkIcon" size={24} />
                <span className="linkText">Sizing & Fit Guide</span>
              </div>
            </div>

            {/* FAQ Section */}
            <h3 className="faqHeading">
              {categoryFilter
                ? `${
                    categoryFilter.charAt(0).toUpperCase() +
                    categoryFilter.slice(1)
                  } Questions`
                : "Frequently Asked Questions"}
            </h3>
            <div className="faqList">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    className={`faqItem ${activeFaq === faq.id ? "open" : ""}`}
                  >
                    <button
                      className="faqQuestion"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={activeFaq === faq.id}
                    >
                      {faq.question}
                      <ChevronDown className="chevronIcon" size={20} />
                    </button>
                    <div className="faqAnswer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">
                  No results found for "{searchTerm || categoryFilter}". Please
                  try a different category or search term.
                </p>
              )}
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default HelpCenter;
