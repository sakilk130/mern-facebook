import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axios';
import styles from './styles/photos.module.css';
interface IPhotos {
  userName: string;
}

const Photos = ({ userName }: IPhotos) => {
  const [photos, setPhotos] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const path = `${userName}/*`;
  const max = 30;
  const sort = 'desc';

  useEffect(() => {
    const getPhotos = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.post(`/upload/list-images`, {
          path,
          max,
          sort,
        });
        setPhotos(data?.data);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        setError(
          error.response.data.error ??
            error.response.data.message ??
            'Something went wrong',
        );
      }
    };
    getPhotos();
    return () => {
      setPhotos(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.profile_card}>
      <div className={styles.profile_card_header}>
        Photos
        <div className={styles.profile_header_link}>See all photos</div>
      </div>
      <div className={styles?.profile_card_count}>
        {photos?.total_count === 0
          ? ''
          : photos?.total_count === 1
          ? '1 Photo'
          : `${photos?.total_count} photos`}
      </div>
      <div className={styles.profile_card_grid}>
        {photos?.resources &&
          photos?.resources.slice(0, 9).map((img: any) => (
            <div className={styles.profile_photo_card} key={img.public_id}>
              <img src={img.secure_url} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Photos;
