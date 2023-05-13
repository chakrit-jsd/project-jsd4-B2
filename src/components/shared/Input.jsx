import { ErrorMessage } from '@hookform/error-message'
import { provincesThailand } from '../../assets/data/provinceList'

export const Input = ({ label, field, register, errors, placeholder, type, id, className, autocomplete, children }) => {

  return (
    <>
      <label className='container-input-text-component'>
        <p className='label'>{label}</p>
        <p className='error-input' ><ErrorMessage errors={errors} name={field} /></p>
        <div>
          <input {...register(field)} placeholder={placeholder} type={type} className={className} autoComplete={autocomplete} />
          {children}
        </div>
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
        <option value="Yoga">Yoga</option>
        <option value="Hiit">HITT</option>
        <option value="Pilates">Pilates</option>
        <option value="Weight">Weight Training</option>
        <option value="Strength">Strngth Training</option>
      </select>
    </label>
  )
}

export const Radio = ({register, errors}) => {

  return (
    <label htmlFor='none'>
      <p className='radio-title'>Gender</p>
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
