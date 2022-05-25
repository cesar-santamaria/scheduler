import { useState, useEffect } from 'react';
import axios from 'axios';

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const countSpots = (appointments) => {
    return state.days.map((day) => {
      let count = 0;
      day.appointments.forEach((appointmentId) => {
        if (!appointments[appointmentId].interview) {
          count += 1;
        }
      });
      return { ...day, spots: count };
    });
  };

  
  const bookInterview = (id, interview) => {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const updatedDays = countSpots(appointments);
    
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => setState ({ ...state, appointments, days: updatedDays }))
      .catch((error) => {
        console.log(error)
      })
  };
  
  const cancelInterview = (id, interview) => {
    
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const updatedDays = countSpots(appointments);
  
    return axios
      .delete(`/api/appointments/${id}`, appointment)
      .then(() => setState({ ...state, appointments, days: updatedDays }))
  };
  
  const setDay = day => setState({ ...state, day });
  
  useEffect(()=>{
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: { ...all[1].data },
        interviewers: {...all[2].data},
      }));
    });
  },[]);
  
 return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;
