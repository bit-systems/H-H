'use client';
import  Link  from 'next/link';
import { useMediaQuery } from 'react-responsive';
import {
  FaInstagram,
  FaTwitterSquare,
  FaTiktok,
  FaFacebookF,
  FaYoutube,
} from 'react-icons/fa';

import Newsletter from './Newsletter';

import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Footer = () => {

  const [isCollectionPage, setIsCollectionPage] = useState(false);

  const location = useRouter();

  const isBigScreen = useMediaQuery({
    query: '(min-width: 1024px)',
  });

  useEffect(() => {

    if(location.isReady) {
      const pathname = location.pathname.split('/');
      const isCollectionPage = pathname.includes('collections');
      setIsCollectionPage(isCollectionPage);
    }

  }, [location.pathname]);


  return (
    <footer
      className={`${styles.footer} ${
        isCollectionPage && isBigScreen
          ? styles.is_collection_page_b
          : styles.is_collection_page_s
      }`}
      suppressHydrationWarning 
    >
      {!isBigScreen && <Newsletter />}
      <div className={styles.container} suppressHydrationWarning >
        <div className={styles.sitemap}>
          <div className={styles.nav_wrapper}>
            <h4 className={styles.nav_title}>Help</h4>
            <ul className={styles.nav}>
              <li>
                <Link href="/">Help Center</Link>
              </li>
              <li>
                <Link href="/">Contact Us</Link>
              </li>
              <li>
                <Link href="/">Shipping Info</Link>
              </li>
              <li>
                <Link href="/">Track My Order</Link>
              </li>
              <li>
                <Link href="/">Returns & Exchanges</Link>
              </li>
            </ul>
          </div>
          <div className={styles.nav_wrapper}>
            <h4 className={styles.nav_title}>More</h4>
            <ul className={styles.nav}>
              <li>
                <Link href="">About Us</Link>
              </li>
              <li>
                <Link href="">Carreers</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.socials_wrapper}>
          {isBigScreen && <Newsletter />}
          <div className={styles.socials}>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
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
      </div>
    </footer>
  );
};

export default Footer;
