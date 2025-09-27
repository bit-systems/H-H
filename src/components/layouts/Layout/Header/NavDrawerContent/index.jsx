import Link from "next/link";

import { Autoplay, Pagination } from "swiper";

import {
  FaExclamationTriangle,
  FaUserCircle,
  FaShippingFast,
  FaQuestionCircle,
  FaSyncAlt,
  FaInfoCircle,
  FaInstagram,
  FaTwitterSquare,
  FaMapMarkerAlt,
  FaTag,
  FaBriefcase,
  FaFacebookF,
  FaTiktok,
  FaYoutube,
  FaPhone,
} from "react-icons/fa";

import { GlobeLock, Handshake } from "lucide-react";

import { useAuthContext } from "@/hooks/useAuthContext";

import { Slider } from "@/components/common";

import { SLIDES as slides } from "./data";

import styles from "./index.module.scss";

const NavDrawerContent = ({ toggleSideNav }) => {
  const { isAdmin, isVerified, name } = useAuthContext();

  return (
    <div className={styles.container}>
      <div className={styles.links_container}>
        <ul className={styles.links_list}>
          <h2>Products</h2>
          {/* <li>
            <Link
              href="/collections/t-shirts"
              onClick={toggleSideNav}
              className={styles.link}
            >
              T-Shirts
            </Link>
          </li> */}
          <li>
            <Link
              href="/collections/shirts"
              onClick={toggleSideNav}
              className={styles.link}
            >
              Shirts
            </Link>
          </li>
          {/* <li>
            <Link
              href="/collections/accessories"
              onClick={toggleSideNav}
              className={styles.link}
            >
              Accessories
            </Link>
          </li> */}
        </ul>
        <ul className={styles.links_list}>
          <h2>Drops</h2>
          <li>
            <Link
              href="/collections/products"
              onClick={toggleSideNav}
              className={styles.link}
            >
              #001
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.products_container}>
        <Slider
          slides={slides}
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          centeredSlides={true}
          grabCursor={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          sliderClassName={styles.slider}
          imageFillClassName={styles.image_fill}
          imageClassName={styles.image}
        />
      </div>
      <div className={styles.info_container}>
        {isVerified && <h2 className={styles.title}>Welcome back, {name}!</h2>}
        <ul className={styles.links_list}>
          {isAdmin && (
            <li>
              <Link
                href="/admin"
                onClick={toggleSideNav}
                className={styles.link}
              >
                <i>
                  <FaExclamationTriangle />
                </i>
                Admin
              </Link>
            </li>
          )}
          <li>
            <Link
              href={isVerified ? "/account" : "/login"}
              onClick={toggleSideNav}
              className={styles.link}
            >
              <i>
                <FaUserCircle />
              </i>
              {isVerified ? "My account" : "Login"}
            </Link>
          </li>
          <li>
            <Link
              href="/help-center"
              onClick={toggleSideNav}
              className={styles.link}
            >
              <i>
                <FaQuestionCircle />
              </i>
              Help Center
            </Link>
          </li>
          <li>
            <Link
              href="/terms-conditions"
              onClick={toggleSideNav}
              className={styles.link}
            >
              <i>
                <Handshake />
              </i>
              Terms & Conditions
            </Link>
          </li>
          <li>
            <Link href="/" onClick={toggleSideNav} className={styles.link}>
              <i>
                <FaMapMarkerAlt />
              </i>
              Track Your Order
            </Link>
          </li>
          <li>
            <Link href="/" onClick={toggleSideNav} className={styles.link}>
              <i>
                <FaTag />
              </i>
              Discounts
            </Link>
          </li>
          <li>
            <Link
              href="/privacy-policy"
              onClick={toggleSideNav}
              className={styles.link}
            >
              <i>
                <GlobeLock />
              </i>
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              href="/contact-us"
              onClick={toggleSideNav}
              className={styles.link}
            >
              <i>
                <FaPhone />
              </i>
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              href="/about-us"
              onClick={toggleSideNav}
              className={styles.link}
            >
              <i>
                <FaInfoCircle />
              </i>
              About Us
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.socials_container}>
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
          <FaInstagram />
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noreferrer">
          <FaTiktok />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <FaTwitterSquare />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <FaFacebookF />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer">
          <FaYoutube />
        </a>
      </div>
    </div>
  );
};

export default NavDrawerContent;
