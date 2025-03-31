"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaTimes, FaSearch } from "react-icons/fa";
import styles from "@/styles/SearchBar.module.css";

const SearchBar: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      setSearchValue(decodeURIComponent(searchQuery));
    }else{
      setSearchValue("");
    }
  }, [searchParams]);

  const handleRemoveButtonClick = () => {
    setSearchValue("");
    router.push("/");
  };

  const handleSearchButtonClick = () => {
    if (searchValue.trim() !== "") {
      router.push(`/?search=${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.inputBox}>
        <input
          type="text"
          placeholder="Pokemon name"
          className={styles.input}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchButtonClick();
            }
          }}
        />

        {searchValue !== "" && (
          <button
            onClick={handleRemoveButtonClick}
            type="button"
            className={styles.removeButton}
          >
            <FaTimes className={styles.removeIcon} />
          </button>
        )}
      </div>

      <button
        onClick={handleSearchButtonClick}
        type="button"
        className={styles.searchButton}
      >
        <FaSearch className={styles.searchIcon} />
      </button>
    </section>
  );
};

export default SearchBar;
