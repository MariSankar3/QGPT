import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // useLayoutEffect is often preferred for instant results,
  // to avoid a flicker before the scroll happens.
  useLayoutEffect(() => {
    window.scrollTo(0, 0); 
    // or document.documentElement.scrollTo(0, 0)
  }, [pathname]);

  return null; // This component doesn't render anything, it just handles the side effect
}
