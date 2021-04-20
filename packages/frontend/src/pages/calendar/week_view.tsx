import React, { Fragment } from 'react';
import { format, isToday } from 'date-fns';

import { capitalize } from '@helpers/index';
import { days_of_week, hours } from './calendar.utils';

export const WeekView1: React.FC<{ week: Date[] }> = ({ week }) => (
  <table className="calendar--table week-view">
    <thead className="week-view-head">
      <tr className="cal-section-header">
        <td>
          <table>
            <tbody>
              <tr className="cal-header">
                <td className="cal-header-cell cal-time-axis">
                  <div className="cal-time-axis-block">{''}</div>
                </td>
                {week.map((day, day_index) => (
                  <td
                    key={format(day, 'yyyy/MM/dd')}
                    className={`cal-header-cell cal-day cal-day-${days_of_week[day_index].day} cal-day-past`}
                    data-date={format(day, 'yyyy/MM/dd')}
                  >
                    <div className="cal-sync-inner">
                      <a
                        className="cal-header-cell-cushion "
                        data-navlink={{ date: format(day, 'yyyy/MM/dd'), type: 'day' }}
                      >
                        {capitalize(days_of_week[day_index].day)} {format(day, 'MM/dd')}
                      </a>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </thead>
    <tbody className="week-view-body">
      {false && (
        <tr className="cal-section cal-section-body cal-section-body-sticky">
          <td>
            <table>
              <tbody>
                <tr>
                  <td className="cal-time-axis cal-shrink">
                    <span className="cushion">all-day</span>
                  </td>
                  {week.map((day, day_index) => (
                    <td
                      key={format(day, 'yyyy/MM/dd')}
                      className={`cal-day cal-day-${days_of_week[day_index].day} cal-day-today`}
                      data-date="2021-04-17"
                    >
                      <div className="cal-day-inner">
                        <div className="cal-day-events">
                          {/* map over ALL DAY events */}
                          <div className="cal-event-harness cal-event-harness-abs">
                            <a className="cal-block-event">
                              <div className="cal-event">
                                <div className="cal-event-frame">
                                  <div className="cal-event-title-container">
                                    <div className="cal-event-title cal-sticky">Conference</div>
                                  </div>
                                </div>
                              </div>
                              <div className="cal-event-resizer cal-event-resizer-end"></div>
                            </a>
                          </div>
                        </div>
                        <div className="cal-day-bg"></div>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      )}
      <tr className="cal-section">
        <td className="cal-time-divider cal-cell-shaded"></td>
      </tr>
      <tr className="cal-section cal-section-body cal-scroller">
        <td>
          <div className="cal-time-body">
            <div className="cal-time-slots">
              <table>
                <tbody>
                  {hours.map((h, index) => (
                    <Fragment key={`hour-${index}`}>
                      <tr className="cal-time-slot">
                        <td className="cal-time-slot-label cal-shrink" data-time={`${h}:00:00`}>
                          <div className="cal-time-slot-label-frame cal-shrink-frame">
                            <div className="cal-time-slot-label-cushion cal-shrink-cushion">
                              {h % 12 > 0 ? h % 12 : 12}
                              {h > 12 ? 'pm' : 'am'}
                            </div>
                          </div>
                        </td>
                        <td
                          className="cal-time-slot cal-time-slot-lane"
                          data-time={`${h}:00:00`}
                        ></td>
                      </tr>
                      <tr className="cal-time-slot">
                        <td
                          className="cal-time-slot-label cal-shrink"
                          data-time={`${h}:00:00`}
                        ></td>
                        <td
                          className="cal-time-slot cal-time-slot-lane"
                          data-time={`${h}:00:00`}
                        ></td>
                      </tr>
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            {/* <div className="cal-time-cols">
                <table>
                  <colgroup>
                    <col style={{ width: '54px' }} />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td className="cal-time-col cal-time-axis">
                        <div className="cal-time-col-frame">
                          <div className="cal-time-now-indicator-container"></div>
                        </div>
                      </td>
                      <td
                        className="cal-time-col cal-day cal-day-sun cal-day-past"
                        data-date="2021-04-11"
                      >
                        <div className="cal-time-col-frame">
                          <div className="cal-time-col-bg"></div>
                          <div className="cal-time-col-events"></div>
                          <div className="cal-time-col-events"></div>
                          <div className="cal-time-now-indicator-container"></div>
                        </div>
                      </td>
                      <td
                        className="cal-time-col cal-day cal-day-mon cal-day-past"
                        data-date="2021-04-12"
                      >
                        <div className="cal-time-col-frame">
                          <div className="cal-time-col-bg"></div>
                          <div className="cal-time-col-events"></div>
                          <div className="cal-time-col-events"></div>
                          <div className="cal-time-now-indicator-container"></div>
                        </div>
                      </td>
                      <td
                        className="cal-time-col cal-day cal-day-tue cal-day-past"
                        data-date="2021-04-13"
                      >
                        <div className="cal-time-col-frame">
                          <div className="cal-time-col-bg"></div>
                          <div className="cal-time-col-events"></div>
                          <div className="cal-time-col-events"></div>
                          <div className="cal-time-now-indicator-container"></div>
                        </div>
                      </td>
                      <td
                        className="cal-time-col cal-day cal-day-wed cal-day-past"
                        data-date="2021-04-14"
                      >
                        <div className="cal-time-col-frame">
                          <div className="cal-time-col-bg"></div>
                          <div className="cal-time-col-events"></div>
                          <div className="cal-time-col-events"></div>
                          <div className="cal-time-now-indicator-container"></div>
                        </div>
                      </td>
                      <td
                        className="cal-time-col cal-day cal-day-thu cal-day-past"
                        data-date="2021-04-15"
                      >
                        <div className="cal-time-col-frame">
                          <div className="cal-time-col-bg"></div>
                          <div className="cal-time-col-events"></div>
                          <div className="cal-time-col-events"></div>
                          <div className="cal-time-now-indicator-container"></div>
                        </div>
                      </td>
                      <td
                        className="cal-time-col cal-day cal-day-fri cal-day-past"
                        data-date="2021-04-16"
                      >
                        <div className="cal-time-col-frame">
                          <div className="cal-time-col-bg"></div>
                          <div className="cal-time-col-events">
                            <div className="cal-time-event-harness">
                              <a className="cal-time-event cal-v-event cal-event cal-event-draggable cal-event-resizable cal-event-start cal-event-end cal-event-past">
                                <div className="cal-event-main">
                                  <div className="cal-event-main-frame">
                                    <div className="cal-event-time">4:00</div>
                                    <div className="cal-event-title-container">
                                      <div className="cal-event-title cal-sticky">
                                        Repeating Event
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="cal-event-resizer cal-event-resizer-end"></div>
                              </a>
                            </div>
                          </div>
                          <div className="cal-time-col-events"></div>
                          <div className="cal-time-now-indicator-container"></div>
                        </div>
                      </td>
                      <td
                        className="cal-time-col cal-day cal-day-sat cal-day-today "
                        data-date="2021-04-17"
                      >
                        <div className="cal-time-col-frame">
                          <div className="cal-time-col-bg"></div>
                          <div className="cal-time-col-events">
                            <div className="cal-time-event-harness">
                              <a className="cal-time-event cal-v-event cal-event cal-event-draggable cal-event-resizable cal-event-start cal-event-end cal-event-today cal-event-future">
                                <div className="cal-event-main">
                                  <div className="cal-event-main-frame">
                                    <div className="cal-event-time">10:30 - 12:30</div>
                                    <div className="cal-event-title-container">
                                      <div className="cal-event-title cal-sticky">Meeting</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="cal-event-resizer cal-event-resizer-end"></div>
                              </a>
                            </div>
                            <div className="cal-time-event-harness cal-time-event-harness-inset">
                              <a className="cal-time-event cal-v-event cal-event cal-event-draggable cal-event-resizable cal-event-start cal-event-end cal-event-today cal-event-future">
                                <div className="cal-event-main">
                                  <div className="cal-event-main-frame">
                                    <div className="cal-event-time">12:00</div>
                                    <div className="cal-event-title-container">
                                      <div className="cal-event-title cal-sticky">Lunch</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="cal-event-resizer cal-event-resizer-end"></div>
                              </a>
                            </div>
                            <div className="cal-time-event-harness">
                              <a className="cal-time-event cal-v-event cal-event cal-event-draggable cal-event-resizable cal-event-start cal-event-end cal-event-today cal-event-future">
                                <div className="cal-event-main">
                                  <div className="cal-event-main-frame">
                                    <div className="cal-event-time">2:30</div>
                                    <div className="cal-event-title-container">
                                      <div className="cal-event-title cal-sticky">Meeting</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="cal-event-resizer cal-event-resizer-end"></div>
                              </a>
                            </div>
                            <div className="cal-time-event-harness">
                              <a className="cal-time-event cal-v-event cal-event cal-event-draggable cal-event-resizable cal-event-start cal-event-end cal-event-today cal-event-future">
                                <div className="cal-event-main">
                                  <div className="cal-event-main-frame">
                                    <div className="cal-event-time">5:30</div>
                                    <div className="cal-event-title-container">
                                      <div className="cal-event-title cal-sticky">Happy Hour</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="cal-event-resizer cal-event-resizer-end"></div>
                              </a>
                            </div>
                            <div className="cal-time-event-harness">
                              <a className="cal-time-event cal-v-event cal-event cal-event-draggable cal-event-resizable cal-event-start cal-event-end cal-event-today cal-event-future">
                                <div className="cal-event-main">
                                  <div className="cal-event-main-frame">
                                    <div className="cal-event-time">8:00</div>
                                    <div className="cal-event-title-container">
                                      <div className="cal-event-title cal-sticky">Dinner</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="cal-event-resizer cal-event-resizer-end"></div>
                              </a>
                            </div>
                          </div>
                          <div className="cal-time-col-events"></div>
                          <div className="cal-time-now-indicator-container"></div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div> */}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
);

export const WeekView: React.FC<{ week: Date[]; goToDayView: (d: Date) => void }> = ({
  week,
  goToDayView,
}) => (
  <table className="calendar--table week-view">
    <thead className="week-view-header">
      <tr>
        {week.map((day, day_index) => (
          <td
            key={format(day, 'yyyy/MM/dd')}
            className={`cal-header-cell cal-day cal-day-${days_of_week[day_index].day} cal-day-past`}
            data-date={format(day, 'yyyy/MM/dd')}
          >
            <div className="cal-sync-inner">
              {capitalize(days_of_week[day_index].day)} -
              <a
                onClick={() => goToDayView(day)}
                className="cal-header-cell-cushion cal-header-cell-number-tag"
                data-navlink={{ date: format(day, 'yyyy/MM/dd'), type: 'day' }}
              >
                {format(day, 'dd')}
              </a>
            </div>
          </td>
        ))}
      </tr>
    </thead>
    <tbody className="week-view-body">
      <tr className="cal-body-section">
        {week.map((day, day_index) => (
          <td
            key={format(day, 'yyyy/MM/dd')}
            className={`cal-body-cell ${isToday(day) ? 'cal-body-cell--today' : ''}`}
            data-date={format(day, 'yyyy/MM/dd')}
          >
            <div className="cal-sync-inner">
              <a
                className="cal-body-cell-cushion"
                data-navlink={{ date: format(day, 'yyyy/MM/dd'), type: 'day' }}
              ></a>
            </div>
          </td>
        ))}
      </tr>
    </tbody>
  </table>
);
