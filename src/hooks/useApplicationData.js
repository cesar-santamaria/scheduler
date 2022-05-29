import { useState, useEffect } from 'react'
import axios from 'axios'

const useApplicationData = () => {
  // keeps track of state for application
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  })

  // gets api data and sets state for use
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: { ...all[1].data },
        interviewers: { ...all[2].data },
      }))
    })
  }, [])

  const countSpots = (appointments) => {
    return state.days.map((day) => {
      let count = 0
      day.appointments.forEach((appointmentId) => {
        if (!appointments[appointmentId].interview) {
          count += 1
        }
      })
      return { ...day, spots: count }
    })
  }

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    }

    const updatedDays = countSpots(appointments)

    // sets state of api to include new interview
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => setState({ ...state, appointments, days: updatedDays }))
  }

  const cancelInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    }

    const updatedDays = countSpots(appointments)
    
    return axios
      .delete(`/api/appointments/${id}`, appointment) // deletes existing interview
      .then(() => setState({ ...state, appointments, days: updatedDays }))
  }

  const setDay = (day) => setState({ ...state, day })

  

  return { state, setDay, bookInterview, cancelInterview }
}

export default useApplicationData
