import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToLocation = () => {
    const { pathname, hash, key } = useLocation();

    useEffect(() => {
        // If we have a hash, scroll to it
        if (hash) {
            const id = hash.replace("#", "");
            const element = document.getElementById(id);
            if (element) {
                // Add a slight delay to ensure content is rendered
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        } else {
            // If no hash, scroll to top (unless it's a simple state change, but sticking to top on nav is good)
            // Only scroll to top if not back/forward nav maybe, but simple is fine
            window.scrollTo(0, 0);
        }
    }, [pathname, hash, key]);

    return null;
};

export default ScrollToLocation;
