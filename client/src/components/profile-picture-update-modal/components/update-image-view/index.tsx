import cls from 'classnames';
import { useCallback, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../../../helpers/image';
import styles from './styles/update-image-view.module.css';

interface IUpdateImageView {
  setImage: any;
  image: any;
  setError: any;
  pRef: any;
}
const UpdateImageView = ({
  setImage,
  image,
  pRef,
  setError,
}: IUpdateImageView) => {
  const [description, setDescription] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const slider = useRef<any>(null);

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const getCroppedImage = useCallback(
    async (show: any) => {
      try {
        const img = await getCroppedImg(image, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setImage(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [croppedAreaPixels],
  );
  const zoomIn = () => {
    slider.current.stepUp();
    setZoom(slider.current.value);
  };
  const zoomOut = () => {
    slider.current.stepDown();
    setZoom(slider.current.value);
  };
  return (
    <>
      <div className={styles.update_image_desc}>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={cls(styles.textarea_blue, styles.details_input)}
        ></textarea>
      </div>
      <div className={styles.update_center}>
        <div className={styles.crooper}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape="round"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={false}
          />
        </div>
        <div className={styles.slider}>
          <div className="slider_circle hover1" onClick={() => zoomOut()}>
            <i className="minus_icon"></i>
          </div>
          <input
            type="range"
            min={1}
            max={3}
            step={0.2}
            ref={slider}
            value={zoom}
            onChange={(e: any) => setZoom(e.target.value)}
          />
          <div
            className={cls(styles.slider_circle, 'hover1')}
            onClick={() => zoomIn()}
          >
            <i className="plus_icon"></i>
          </div>
        </div>
      </div>
      <div className={styles.flex_up}>
        <div className="gray_btn" onClick={() => getCroppedImage('show')}>
          <i className="crop_icon"></i>Crop photo
        </div>
        <div className="gray_btn">
          <i className="temp_icon"></i>Make Temporary
        </div>
      </div>
      <div className={styles.flex_p_t}>
        <i className="public_icon"></i>
        Your profile picture is public
      </div>
      <div className={styles.update_submit_wrap}>
        {/* <div className="blue_link" onClick={() => setImage('')}>
          Cancel
        </div> */}
        {/* <button
          className="blue_btn"
          disabled={loading}
          onClick={() => updateProfielPicture()}
        >
          {loading ? <PulseLoader color="#fff" size={5} /> : 'Save'}
        </button> */}
      </div>
    </>
  );
};

export default UpdateImageView;
