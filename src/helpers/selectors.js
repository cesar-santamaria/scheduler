export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter((dayOfWeek) => dayOfWeek.name === day);
  
  if (filteredDay[0]) {
    const appointmentArr = filteredDay[0].appointments.map((id) => state.appointments[id]);
    return appointmentArr;
  } else {
    return [];
  }
}