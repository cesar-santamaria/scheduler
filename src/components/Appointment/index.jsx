import React from "react";
import "components/Appointment/Header"
import Header from "components/Appointment/Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from './Error';
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE"
const EDIT = "EDIT";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVE)
    props.bookInterview(props.id, interview)
      .then(()=>{transition(SHOW)})
      .catch(() => transition(ERROR_SAVE, true));
    
  };

  const destroy = () => {
    transition(DELETE, true);
    props.cancelInterview(props.id, props.interview)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interview={props.interview}
        onEdit={()=>transition(EDIT)}
        onDelete={() => transition(CONFIRM)}
      />
    )}
    {mode === CREATE && (
      <Form 
        interviewers={props.interviewers} 
        onCancel={()=> back()} 
        onSave={save}
      />
    )}
    {mode === EDIT && (
      <Form 
        interviewers={props.interviewers}
        interviewer={props.interview.interviewer.id}
        student={props.interview.student}
        onCancel={()=> back()} 
        onSave={save}
      />
    )}
    {mode === SAVE && (
      <Status 
        message={'Saving'} 
      />
    )}
    {mode === DELETE && (
      <Status 
        message={'Deleting'} 
      />
    )}
    {mode === CONFIRM && (
      <Confirm 
       message={'Deleting'} 
       onConfirm={destroy} 
       onCancel={back} 
      />
    )}
    {mode === ERROR_SAVE && (
      <Error 
        message={'Error occured'} 
        onClose={back} 
      />
    )}
    {mode === ERROR_DELETE && (
      <Error 
        message={'Error occured'} 
        onClose={back} 
      />
    )}
    </article>
  )
};
