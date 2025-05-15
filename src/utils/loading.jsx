import { useEffect } from 'react';

export default function useLazyLoad({
  allItems,
  count,
  loadItems,
  threshold = 200,
}) {
  useEffect(() => {
    const handleScroll = () => {
      const isBottomReached =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold;

      if (isBottomReached && count < allItems.length) {
        loadItems();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [allItems, count, loadItems, threshold]);

  useEffect(() => {
    const checkScrollableAndLoad = () => {
      const isScrollable = document.body.scrollHeight > window.innerHeight;
      if (!isScrollable && count < allItems.length) {
        loadItems();
      }
    };

    checkScrollableAndLoad();
  }, [allItems, count, loadItems]);
}
