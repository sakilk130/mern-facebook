import cls from 'classnames';
import { useMediaQuery } from 'react-responsive';
import { stories } from '../../../../data/home';
import { ArrowRight, Plus } from '../../../../svg';
import Story from './components/story';
import styles from './styles/stories.module.css';

const Stories = () => {
  const query1175px = useMediaQuery({
    query: '(max-width: 1175px)',
  });
  const query900px = useMediaQuery({
    query: '(max-width: 900px)',
  });

  let max = stories.length;
  if (query900px) {
    max = 5;
  } else if (query1175px) {
    max = 4;
  } else {
    max = stories.length;
  }

  return (
    <div className={cls(styles.container)}>
      <div className={cls(styles.story)}>
        <img src="../../../images/default_pic.png" alt="story" />
        <div className={cls(styles.info)}>
          <div className={cls(styles.plusIcon)}>
            <Plus color="#fff" />
          </div>
          <div className={cls(styles.createStory)}>Create Story</div>
        </div>
      </div>
      {stories.slice(0, max).map((story) => (
        <Story
          key={story.profile_name}
          image={story.image}
          profile_name={story.profile_name}
          profile_picture={story.profile_picture}
        />
      ))}
      <div className={cls(styles.arrowRight)}>
        <ArrowRight color="#65676b" />
      </div>
    </div>
  );
};

export default Stories;
