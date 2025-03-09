import { useEffect } from 'react';
import '../styles/globals.css';
import { AnimatePresence } from 'framer-motion';
// rest of the code

function MyApp({ Component, pageProps, router }) {
  // 添加平滑滚动行为
  useEffect(() => {
    // 添加'loaded'类用于淡入动画
    document.documentElement.classList.add('loaded');
    
    // 设置锚点平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Component key={router.route} {...pageProps} />
    </AnimatePresence>
  );
}

export default MyApp;
