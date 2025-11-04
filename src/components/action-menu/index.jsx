"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

import { useAuthContextV2 } from "@/hooks/useAuthContextV2";

import { RiMenuLine } from "react-icons/ri";
import { CgMenu } from "react-icons/cg";

import { Button } from "@/components/common";

// import LogoNav from '/assets/images/logo-nav.png';

import styles from "./index.module.scss";
import { useRouter } from "next/navigation";

const ActionMenu = ({}) => {
  //   useEffect(() => {
  //     window.addEventListener("scroll", resizeHeaderOnScroll);

  //     return () => window.removeEventListener("scroll", resizeHeaderOnScroll);
  //   }, []);

  const navStyles = styles.nav;

  return (
    <nav className={navStyles}>
      <div className={styles.container_top}>
        <Button className={`${styles.link} ${styles.info_link}`} type="button">
          <CgMenu size={20} />
        </Button>
        <ul className={styles.info_list}>
          <li>
            <Link className={styles.link} href="/help-center">
              View
            </Link>
          </li>
          <li>
            <Link className={styles.link} href="/contact-us">
              Edit
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default ActionMenu;
