"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Portal({ children, containerId = "portal-root" }) {
  const [mounted, setMounted] = useState(false);
  const [container, setContainer] = useState(null);

  useEffect(() => {
    setMounted(true);
    setContainer(document.getElementById(containerId));
  }, [containerId]);

  if (!mounted || !container) return null;

  return createPortal(children, container);
}
