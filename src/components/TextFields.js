import { Field } from "react-final-form";

export const TextFields = ({ label, name }) => (
  <Field
    name={name}
    render={({ input, meta }) => (
      <>
        <label>{label}:</label>
        <input className="nes-input" {...input}  />
      </>
    )}
  />
)