import { ErrorMessage } from '@hookform/error-message'
import { provincesThailand } from '../../assets/data/provinceList'

export const Input = ({ label, field, register, errors, placeholder, type, id, className, autocomplete }) => {

  return (
    <>
      <label className='container-input-text-component'>
        <p className='label'>{label}</p>
        <p className='error-input' ><ErrorMessage errors={errors} name={field} /></p>
        <input {...register(field)} placeholder={placeholder} type={type} className={className} autoComplete={autocomplete} />
      </label>
    </>
  )
}



export const Select = ({label, register, field, errors, id, className }) => {

  return (
    <label>
      <p>{label}</p>
      <p className='error-input' ><ErrorMessage errors={errors} name={field} /></p>
      <select {...register(field)}>
        <option value="yoga">Yoga</option>
        <option value="hiit">HITT</option>
        <option value="pilates">Pilates</option>
        <option value="weight">Weight Training</option>
        <option value="strength">Strngth Training</option>
      </select>
    </label>
  )
}

export const Radio = ({register, errors}) => {

  return (
    <label htmlFor='none'>
      <p>Gender</p>
      <p className='error-input' ><ErrorMessage errors={errors} name='gender' /></p>
      <input id="male" type="radio" {...register('gender')} value='male' />
      <label htmlFor="male">Male</label>
      <input id="female" type="radio" {...register('gender')} value='female' />
      <label htmlFor="female">Female</label>
      <input id="other" type="radio" {...register('gender')} value='other' />
      <label htmlFor="other" >Other</label>
    </label>
  )
}

export const CityList = ({register, errors}) => {

  return (
    <label>
      <p>City</p>
      <p className='error-input' ><ErrorMessage errors={errors} name='city' /></p>
      <select {...register('city')}>
        {provincesThailand.map((city, index) => (
          <option key={index} value={city}>{city}</option>
        ))}
      </select>
    </label>
  )
}
