import css from "../../Index.module.css";

interface Props {
  onButton: () => void;
}

export const Button = ({ onButton }: Props) => {
  return (
    <button className={css.button} type="submit" onClick={onButton}>
      Load more
    </button>
  );
};
