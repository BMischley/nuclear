import { SmoothImage } from '@nuclear/ui';
import React from 'react';
import { Tab } from 'semantic-ui-react';
import _ from 'lodash';
import genreToIcon from './mapGenres';
import styles from './styles.scss';

interface Genre {
  name: string;
}

interface GenresTabProps {
  genres?: Genre[];
  history: {
    push: (path: string) => void;
  };
}

const bannedGenres = ['seen live'];

class GenresTab extends React.Component<GenresTabProps> {
  constructor(props: GenresTabProps) {
    super(props);
  }

  onGenreClick(genreName: string) {
    this.props.history.push('/tag/' + genreName);
  }

  render() {
    const { genres } = this.props;
    return (
      <Tab.Pane attached={false}>
        <div className={styles.genre_tab_container}>
          {typeof genres !== 'undefined'
            ? _.filter(genres, genre => !_.includes(bannedGenres, genre.name)).map((tag, i) => {
                return (
                  <div className={styles.genre_container} key={i} onClick={() => this.onGenreClick(tag.name)}>
                    <div className={styles.genre_overlay}>
                      <SmoothImage src={'https://picsum.photos/256?random=' + i} />
                    </div>
                    <div className={styles.genre_name}>
                      <div className={styles.svg_icon} dangerouslySetInnerHTML={{ __html: genreToIcon(tag.name) }} />
                      {tag.name}
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </Tab.Pane>
    );
  }
}

export default GenresTab;
