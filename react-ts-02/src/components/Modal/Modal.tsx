import { useRef, useEffect } from "react";
import css from "../../Index.module.css";

interface Props {
  largeImageUrl: string;
  onPress: () => void;
  tags: string;
  onEscDown: () => void;
}

export const Modal = ({ largeImageUrl, onPress, tags, onEscDown }: Props) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onEscDown();
    }
  };
  return (
    <div
      className={css.overlay}
      ref={modalRef}
      onClick={onPress}
      tabIndex={0}
      onKeyDown={(e) => {
        handleKeyDown(e);
      }}
    >
      <div className={css.modal}>
        <img src={largeImageUrl} alt={tags} className={css.largeImage} />
        <p className={css.description}>{tags}</p>
      </div>
    </div>
  );
};
