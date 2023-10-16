import css from "../../Index.module.css";

interface Props {
  smallImageUrl: string;
  onPress: () => void;
  tags: string;
}

export const ImageGalleryItem = ({ smallImageUrl, onPress, tags }: Props) => {
  return (
    <li className={css.imageGalleryItem} onClick={onPress}>
      <img
        src={smallImageUrl}
        alt={tags}
        className={css.imageGalleryItemImage}
      ></img>
    </li>
  );
};
