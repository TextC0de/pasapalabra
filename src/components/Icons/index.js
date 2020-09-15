import styled from 'styled-components';
import { faHeart, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const LikeIcon = styled(FontAwesomeIcon).attrs(() => ({
    icon: faHeart
}))`
    background: #eeeeee;
    border-radius: 4px;
    padding: 0.25rem;
    color: ${({ liked }) => (liked ? 'red' : '#666')};
    margin-right: 0.5rem;
`;

export const TimesPlayedIcon = styled(FontAwesomeIcon).attrs(() => ({
    icon: faGamepad
}))`
    background: #eeeeee;
    border-radius: 4px;
    padding: 0.2rem;
    color: ${({ theme, played }) => (played ? theme.colors.primary.dark : '#666')};
    margin-right: 0.5rem;
`;
