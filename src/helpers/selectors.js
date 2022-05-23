export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(days => days.name === day);
  if (!filteredDays[0]) {
    return [];
  } else {
    const appointmentId = filteredDays[0].appointments.map((appointmentId) => state.appointments[appointmentId]);
    return appointmentId
  }
};

export function getInterview(state, interview) {
  let filteredInterview = {...interview};
  
  if(!interview) {
    return null;
  }

  for (const interviewerId in state.interviewers) {
    if (Number(interviewerId) === Number(interview.interviewer)) {
      filteredInterview.interviewer = state.interviewers[interviewerId]
    }
  }
  return filteredInterview;
};