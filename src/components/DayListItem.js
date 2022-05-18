import React from 'react'
import "../styles/DayListItem.scss"
import classNames from 'classnames';

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
    }
  );

  return (
    <li className={dayClass} onClick={()=>props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}

/* 
We'll need to update our component to apply the day-list__item--selected and day-list__item--full styles based on the props we are passing to DayListItem using the classnames library, as we did in the Button component in an earlier activity.
*/