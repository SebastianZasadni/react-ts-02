import { nanoid } from "nanoid";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import css from "../../Index.module.css";

export interface Image {
  previewURL: string;
  largeImageURL: string;
  tags: string;
}

interface Props {
  images: Image[];
  openModal: (largeImageURL: string, tags: string) => void;
}

export const ImageGallery = ({ images, openModal }: Props) => {
  return (
    <ul className={css.imageGallery}>
      {images
        ? images.map((i) => (
            <ImageGalleryItem
              key={nanoid()}
              smallImageUrl={i.previewURL}
              onPress={() => openModal(i.largeImageURL, i.tags)}
              tags={i.tags}
            />
          ))
        : null}
    </ul>
  );
};
