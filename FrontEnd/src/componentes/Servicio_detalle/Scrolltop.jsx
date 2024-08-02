import { useEffect } from 'react';

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top when component mounts
  }, []);

  return null; // No need to render anything
}

export default ScrollToTopOnMount;
