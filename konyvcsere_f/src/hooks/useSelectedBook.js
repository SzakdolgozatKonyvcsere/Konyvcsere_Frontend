import { useEffect, useState } from "react";
// storagekey = selectedbook
// elmenti konyvet a local storagebe + statebe
  // torli a konyvet a korabban elmentett 2 helxrol

export default function useSelectedBook() {
  const [selectedBook, setSelectedBook] = useState(() => {
    const saved = localStorage.getItem("selectedBook");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("selectedBook");
      setSelectedBook(saved ? JSON.parse(saved) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const saveBook = (book) => {
    localStorage.setItem("selectedBook", JSON.stringify(book));
    setSelectedBook(book);
  };

  const clearBook = () => {
    localStorage.removeItem("selectedBook");
    setSelectedBook(null);
  };

  return { selectedBook, saveBook, clearBook };
}