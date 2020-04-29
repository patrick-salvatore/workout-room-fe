import React from 'react';
import DatePicker, { setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FormControl, Grid, FormControlLabel } from '@material-ui/core';
import CalendarIcon from '@material-ui/icons/Event';
import { DateTimePickerProps } from './interfaces';

import './date-time-picker.scss';

setDefaultLocale('enUS');

const DateTimePicker: React.FC<DateTimePickerProps> = (props): JSX.Element => {
  const {
    children,
    className,
    dateFormat,
    dateFormatCalendar,
    disabled,
    dropdownMode,
    endDate,
    excludeDates,
    includeDates,
    inline,
    locale,
    maxDate,
    maxTime,
    minDate,
    minTime,
    monthsShown,
    onChange,
    selected,
    selectsEnd,
    selectsStart,
    showMonthDropdown,
    showTimeSelect,
    showYearDropdown,
    showTimeSelectOnly,
    timeFormat,
    timeIntervals,
    timeCaption,
    todayButton,
    startDate,
    withPortal,
    isValid,
    isInvalid,
    feedback,
    error,
    label,
  } = props;

  const classname = isValid
    ? 'valid-date-picker'
    : isInvalid
    ? 'invalid-date-picker'
    : '';

  return (
    <div className="datepicker__wrapper">
      <label htmlFor={`datePicker-wrapper-${label}`}>{label}</label>
      <div id={`datePicker-wrapper-${label}`} className="datepicker">
        <label htmlFor={`datepicker-${label}`} className="datepicker-label">
          <CalendarIcon />
        </label>
        <DatePicker
          id={`datepicker-${label}`}
          className={`form-control ${classname}`}
          dateFormat={dateFormat}
          dateFormatCalendar={dateFormatCalendar}
          disabled={disabled}
          dropdownMode={dropdownMode}
          endDate={endDate}
          excludeDates={excludeDates}
          includeDates={includeDates}
          inline={inline}
          locale={locale}
          maxDate={maxDate}
          maxTime={maxTime}
          minDate={minDate}
          minTime={minTime}
          monthsShown={monthsShown}
          onChange={onChange}
          selected={selected}
          selectsEnd={selectsEnd}
          selectsStart={selectsStart}
          showMonthDropdown={showMonthDropdown}
          showTimeSelect={showTimeSelect}
          showYearDropdown={showYearDropdown}
          showTimeSelectOnly={showTimeSelectOnly}
          timeFormat={timeFormat}
          timeIntervals={timeIntervals}
          timeCaption={timeCaption}
          todayButton={todayButton}
          startDate={startDate}
          withPortal={withPortal}
        >
          {children}
        </DatePicker>
      </div>
      <div className="datepicker-feedback">
        {((feedback && isValid) || error) && (
          <div
            className={`text-small ${
              isValid ? 'text-success' : isInvalid ? 'text-danger' : ''
            }`}
          >
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
};

export default DateTimePicker;
