export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(days => days.name === day);

  if (!filteredDays[0]) {
    return [];
  } else {
    const appointmentId = filteredDays[0].appointments.map((appointmentId) => state.appointments[appointmentId]);
    return appointmentId
  }
};