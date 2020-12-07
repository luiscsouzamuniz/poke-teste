import { Field } from "react-final-form";

export const TextFields = ({ label, name, required }) => (
  <Field
    name={name}
    validate={value => value ? undefined : 'Campo obrigatório'}
    render={({ input, meta }) => (
      <>
        <label>{label} {required ? <span style={{ color: 'red' }}>*</span> : null }</label>
        <input className="nes-input" {...input}  />
        {
          meta.invalid ? (
            <small className="nes-text is-error">{meta.error}</small>
          ) : null
        }
        <br />
      </>
    )}
  />
)