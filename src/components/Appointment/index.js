import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

import useVisualMode from '../../hooks/useVisualMode';
import {
  EMPTY,
  SHOW,
  CREATE,
  EDIT,
  DELETING,
  SAVING,
  CONFIRM,
  ERROR_SAVE,
  ERROR_DELETE,
} from '../../actions/types';

import './styles.scss';

const Appointment = ({
  id,
  time,
  interview,
  interviewers,
  bookInterview,
  cancelInterview,
}) => {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const newInterview = {
      student: name,
      interviewer,
    };

    transition(SAVING);
    bookInterview(id, newInterview)
      .then(() => {
        transition(SHOW);
      })
      .catch((err) => {
        transition(ERROR_SAVE, true);
      });
  };

  const deleteAppointment = () => {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((err) => {
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <article className='appointment' data-testid='appointment'>
      <Header time={time} />

      {mode === EDIT && (
        <Form
          name={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers} onCancel={back} onSave={save} />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && interview && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          interviewers={interviewers}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}

      {mode === SAVING && <Status message='Saving' />}
      {mode === DELETING && <Status message='Deleting' />}
      {mode === CONFIRM && (
        <Confirm
          message='Are you sure you would like to delete the appointment?'
          onCancel={back}
          onConfirm={deleteAppointment}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message='Could not save appointment.' onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message='Could not delete appointment.' onClose={back} />
      )}
    </article>
  );
};

Appointment.propTypes = {
  time: PropTypes.string.isRequired,
  interview: PropTypes.object,
};

export default Appointment;

/* 
  I had this code when I first implemted the custom hook useVisualMode
  the app needed this code to work that time, somehow it is not needed now
  it is now only kept for reference

  useEffect(() => {
    if (!interview && mode === SHOW) {
      transition(EMPTY);
    }
    if (interview && mode === EMPTY) {
      transition(SHOW);
    }
  }, [mode, transition, interview]);
  */




/*old Appointment code---------
// import React from "react";

// import "components/Appointment/styles.scss";

// import Header from "components/Appointment/Header";

// import Empty from "components/Appointment/Empty";
// import Show from "components/Appointment/Show";
// import {
//   EMPTY,
//   SHOW,
//   CREATE,
//   EDIT,
//   DELETING,
//   SAVING,
//   CONFIRM,
//   ERROR_SAVE,
//   ERROR_DELETE,
// } from '../../actions/types';

// export default function Appointment(props) {
 
//   return (
//     <article className="appointment" data-testid="appointment">
//       <Header time={props.time} />
//       {props.interview ?
//         <Show
//           student={props.interview.student}
//           interviewer={props.interview.interviewer}
//           onDelete={() => console.log("CONFIRM")}
//           onEdit={() => console.log("EDIT")}
//         />
//         :
//         <Empty onAdd={() => console.log("CREATE")} />}
//     </article>
//   );
// }
*/
