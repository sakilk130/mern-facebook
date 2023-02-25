import styles from './styles/react-popup.module.css';

const reacts = [
  {
    name: 'like',
    image: '../../../reacts/like.gif',
  },
  {
    name: 'love',
    image: '../../../reacts/love.gif',
  },
  {
    name: 'haha',
    image: '../../../reacts/haha.gif',
  },
  {
    name: 'wow',
    image: '../../../reacts/wow.gif',
  },
  {
    name: 'sad',
    image: '../../../reacts/sad.gif',
  },
  {
    name: 'angry',
    image: '../../../reacts/angry.gif',
  },
];

interface IReactPopupProps {
  showReactPopup: boolean;
  setShowReactPopup: (value: boolean) => void;
}

const ReactPopup = ({
  setShowReactPopup,
  showReactPopup,
}: IReactPopupProps) => {
  if (!showReactPopup) return null;

  return (
    <div
      className={styles.reactPopup}
      onMouseOver={() => {
        setTimeout(() => {
          setShowReactPopup(true);
        }, 500);
      }}
      onMouseLeave={() => {
        setTimeout(() => {
          setShowReactPopup(false);
        }, 500);
      }}
    >
      {reacts.map((react) => (
        <div key={react.name} className={styles.react}>
          <img src={react.image} alt="" />
        </div>
      ))}
    </div>
  );
};

export default ReactPopup;
