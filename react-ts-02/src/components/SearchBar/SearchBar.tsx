import { useState } from "react";
import css from "../../Index.module.css";

interface Props {
  handleSubmit: (query: string) => void;
}

export const Searchbar = ({ handleSubmit }: Props) => {
  const [query, setQuery] = useState<string>("");

  const inputQueryHandle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  const onSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!query) return;
    handleSubmit(query);
    setQuery("");
  };

  return (
    <header className={css.searchBar}>
      <form className={css.searchForm} onSubmit={onSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>
        <input
          name="query"
          type="text"
          className={css.searchFormInput}
          autoComplete="off"
          autoFocus
          placeholder="Search image and photos"
          id="search-input"
          value={query}
          onChange={inputQueryHandle}
        />
      </form>
    </header>
  );
};
