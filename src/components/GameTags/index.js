import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const TagsContainer = styled.div``;

const TagAnchor = styled.a`
    font-size: 90%;
    display: inline-block;
    transition: 0.15s ease-in-out;
    margin: 0 0.5rem 0.25rem 0;
`;

const GameTags = ({ tags }) => (
    <TagsContainer data-testid="gameTags">
        {tags.length > 0 ? (
            tags.map((tag) => (
                <Link key={tag} href={`/tags/${tag.toLocaleLowerCase()}`} passHref>
                    <TagAnchor data-testid="tag">
                        <small>
                            <FontAwesomeIcon style={{ width: '.5rem' }} icon={faHashtag} />
                            {tag}
                        </small>
                    </TagAnchor>
                </Link>
            ))
        ) : (
            <small>Sin tags</small>
        )}
    </TagsContainer>
);

GameTags.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string)
};

GameTags.defaultProps = {
    tags: []
};

export default GameTags;
