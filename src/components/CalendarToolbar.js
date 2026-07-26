/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import moment from 'moment';

const CalendarToolbar = ({ date, onNavigate }) => {
  const goToBack = () => {
    onNavigate('PREV');
  };

  const goToNext = () => {
    onNavigate('NEXT');
  };

  const goToCurrent = () => {
    onNavigate('TODAY');
  };

  const label = () => {
    const m = moment(date);
    return (
      <span>
        {m.format('MMMM')} {m.format('YYYY')}
      </span>
    );
  };

  return (
    <div className="big-calendar-header">
      <div className="float-left">
        <label>{label()}</label>
      </div>

      <div className="float-right">
        <button
          type="button"
          className="btn btn-primary calendar-today-btn mr-2"
          onClick={goToCurrent}
        >
          Today
        </button>
        <button
          type="button"
          className="btn calendar-prev-btn mr-1"
          onClick={goToBack}
        >
          <span className="simple-icon-arrow-left" />
        </button>
        <button
          type="button"
          className="btn calendar-next-btn"
          onClick={goToNext}
        >
          <span className="simple-icon-arrow-right" />
        </button>
      </div>
    </div>
  );
};

export default CalendarToolbar;