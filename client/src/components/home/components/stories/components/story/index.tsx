import cls from 'classnames';
import styles from './styles/story.module.css';

interface StoryProps {
  profile_picture: string;
  profile_name: string;
  image: string;
}

const Story = ({ image, profile_name, profile_picture }: StoryProps) => {
  return (
    <div className={cls(styles.container)}>
      <img className={cls(styles.storyImage)} src={image} alt="story" />
      <div className={cls(styles.info)}>
        <img src={profile_picture} alt="story" />
        <p>{profile_name}</p>
      </div>
    </div>
  );
};

export default Story;
