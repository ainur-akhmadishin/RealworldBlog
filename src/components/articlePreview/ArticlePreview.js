import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import Api from '../../servise/Api';
import Utilits from '../../servise/Utilits';
import classes from './ArticlePreview.module.scss';

const ArticlePreview = ({ article, isAuth }) => {
  ArticlePreview.defaultProps = {
    article: {},
    isAuth: false,
  };
  const api = new Api();
  const utilits = new Utilits();
  const { title, description, favoritesCount, author, tagList, updatedAt, slug, favorited } = article;

  const { username, image } = author;

  function modalWindow() {
    const modal = Modal.warning({
      title: 'You are not logged in',
      content: `The post can only be evaluated by an authorized user`,
    });
    return modal;
  }

  const [favoretedData, setFavorited] = useState({ favorited, favoritesCount });

  const tags = tagList.length
    ? tagList.map((el) => (
        <li key={el} className={classes['ArticlePreview--tag']}>
          {el}
        </li>
      ))
    : null;

  const classFavorited = favoretedData.favorited ? classes['ArticlePreview--like'] : classes['ArticlePreview--dislike'];

  const onClick = (id) => {
    if (!isAuth) {
      modalWindow();
    } else if (isAuth) {
      if (!favoretedData.favorited) {
        api.favoriteCount(id).then((json) =>
          setFavorited({
            favorited: json.article.favorited,
            favoritesCount: json.article.favoritesCount,
            err: false,
          })
        );
      }

      api.delFavoriteCount(id).then((json) =>
        setFavorited({
          favorited: json.article.favorited,
          favoritesCount: json.article.favoritesCount,
          err: false,
        })
      );
    }
  };

  return (
    <section className={classes.ArticlePreview}>
      <div className={classes['ArticlePreview--article']}>
        <div>
          <span className={classes['ArticlePreview--title']}>
            <Link to={`/article/${slug}`}>{title}</Link>
          </span>
          <button className={classFavorited} type="button" onClick={() => onClick(slug)}>
            {' '}
          </button>
          <span> {favoretedData.favoritesCount}</span>
        </div>
        <ul className={classes['ArticlePreview--tag-list']}>{tags}</ul>
        <p className={classes['ArticlePreview--description']}>{description}</p>
      </div>

      <div className={classes['ArticlePreview--info']}>
        <div className={classes['ArticlePreview--user-info']}>
          <div className={classes['ArticlePreview--user']}>{username}</div>
          <div className={classes['ArticlePreview--date']}>{utilits.formatDate(updatedAt)} </div>
        </div>
        <img src={image} alt="User" className={classes['ArticlePreview--img']} />
      </div>
    </section>
  );
};

ArticlePreview.propTypes = {
  article: PropTypes.instanceOf(Object),
  isAuth: PropTypes.bool,
};

function mapStateToProps(state) {
  const { isAuth } = state.user;
  return { isAuth };
}

export default connect(mapStateToProps, null)(ArticlePreview);
