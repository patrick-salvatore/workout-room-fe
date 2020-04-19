import React, { useState } from 'react';
// import { useLocalStorage } from 'hooks/useLocalStorage'
import { withRouter } from 'react-router';
// import { NavLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import GroupIcon from '@material-ui/icons/Group';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';

import './side-nav.scss';

const Navbar: React.FC = (): JSX.Element => {
  // const [isOpen, setIsOpen] = useLocalStorage<boolean>('sideNavKey', false);
  const [isOpen, setIsOpen] = useState(false);
  const listAnchors = [
    { text: 'Calendar', icon: CalendarTodayIcon },
    { text: 'Progress', icon: TrendingUpIcon },
    { text: 'Teams', icon: GroupIcon },
    { text: 'Rooms', icon: MeetingRoomIcon },
  ];

  const toggleSideNav = (): void => setIsOpen(!isOpen);

  const SidebarButton = (): JSX.Element => (
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
      <SidebarButton />
      <div className="sidenav-contents__wrapper">
        <div className="sidenav__top">
          <h2 className="sidenav-header">The WorkOut Room</h2>
        </div>
        <div className="sidenav__main">
          <List>
            {listAnchors.map(({ text, icon }) => (
              <ListItem button key={text}>
                <ListItemIcon>{React.createElement(icon)}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
