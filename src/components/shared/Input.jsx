import { ErrorMessage } from '@hookform/error-message'

export const Input = ({ label, field, register, errors, placeholder, type, id, className }) => {

  return (
    <>
      <label>
        <p>{label}</p>
        <span><ErrorMessage errors={errors} name={field} /></span>
        <input {...register(field)} placeholder={placeholder} type={type} className={className} />
      </label>
    </>
  )
}



export const Select = ({label, register, field, errors, id, className }) => {

  return (
    <label>
      <p>{label}</p>
      <span><ErrorMessage errors={errors} name={field} /></span>
      <select {...register(field)}>
        <option value="hiit">HITT</option>
        <option value="pilates">Pilates</option>
        <option value="strength">Strngth Training</option>
        <option value="weight">Weight Training</option>
        <option value="yoga">Yoga</option>
      </select>
    </label>
  )
}

