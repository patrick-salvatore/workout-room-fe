import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import HouseIcon from '@material-ui/icons/House';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import GroupIcon from '@material-ui/icons/Group';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';

import './side-nav.scss';

const useStyles = makeStyles(() => ({
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

const SideNav: React.FC = (): JSX.Element => {
  const classes = useStyles();
  // const [isOpen, setIsOpen] = useLocalStorage<boolean>('sideNavKey', false);
  const [isOpen, setIsOpen] = useState(false);
  const listAnchors = [
    { text: 'Home', icon: HouseIcon, anchor: '/' },
    { text: 'Calendar', icon: CalendarTodayIcon, anchor: '/calendar' },
    { text: 'Progress', icon: TrendingUpIcon, anchor: '/progress' },
    { text: 'Rooms', icon: GroupIcon, anchor: '/rooms' },
  ];

  const toggleSideNav = (): void => setIsOpen(!isOpen);

  const SideNavToggle = (): JSX.Element => (
    <div data-testid="clickElm" className="icon__wrapper">
      <div className="sidebar-btn__wrapper">
        {isOpen ? (
          <ChevronLeft onClick={toggleSideNav} className="icon" />
        ) : (
          <ChevronRight onClick={toggleSideNav} className="icon" />
        )}
      </div>
    </div>
  );

  return (
    <nav
      className={`sidenav__wrapper ${isOpen ? 'slide-right' : 'slide-left'}`}
    >
      <SideNavToggle />
      <div className="sidenav-contents__wrapper">
        <div className="sidenav__top">
          <h2 className="sidenav-header">The WorkOut Room</h2>
        </div>
        <div className="sidenav__main">
          <List>
            {listAnchors.map(({ text, icon, anchor }) => (
              <Link href={anchor} key={text} className={classes.link}>
                <ListItem button>
                  <ListItemIcon>{React.createElement(icon)}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
      </div>
    </nav>
  );
};

export default SideNav;
