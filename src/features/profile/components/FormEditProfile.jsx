import { useForm } from 'react-hook-form';
import { CityList, Input, Radio, Select } from '../../../components/shared/Input';
import { yupResolver } from '@hookform/resolvers/yup'
import schema from '../../../utils/validators/validateEditProfile';
import '../../../assets/styles/formEditProfile.css'


const FormEditProfile = ({children, setFormData, handleClose, imgFile, imgPreview, getCropData, setShow }) => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    if (imgPreview && !imgFile) {
      getCropData()
    }
    if (imgFile) {
      const formData = {
        ...data,
        file: imgFile
      }
      setFormData(formData)
      setShow(false)
      return
    }
    setFormData((prev) => (
      {
        ...prev,
        ...data,
        file: imgFile
      }
    ))
    setShow(false)
  }

  return (
    <form id='form-edit-profile'>
      <section className='container-edit-profile-left'>
        {children}
        <p>email</p>
        <Input field='profilename' label='Profile Name' register={register} errors={errors} type='text' />
      </section>
      <div className='edit-profile-vl'></div>
      <section className='container-edit-profile-right'>
        <div className='right-in'>
          <label htmlFor='about-me'>
            <p>About Me</p>
            <p>{errors.aboutme?.message}</p>
            <textarea id="about-me" {...register('aboutme')} type='text' />
          </label>
          <Input label='First Name' field='firstname' register={register}  errors={errors} placeholder='firstname' type='text' />
          <Input label='Last Name' field='lastname' register={register} errors={errors} placeholder='lastname' type='text' />
          <Input label='Birth Date' field='birthdate' register={register} errors={errors} placeholder='birthdate' type='date' />
          <div className='edit-input-radio'>
            <CityList register={register} errors={errors} />
            <Radio register={register} errors={errors} />
          </div>
          <div className='edit-input-container-number'>
            <Select label='Interest' register={register} field='interest' errors={errors} />
            <div className='edit-input-number'>
              <Input field='weight' label='Weight' register={register} errors={errors} type='number' >
                <span className='number-tail'>Kg.</span>
              </Input>
              <Input field='height' label='Height' register={register} errors={errors} type='number' >
                <span className='number-tail'>Cm.</span>
              </Input>
            </div>
          </div>
        </div>
      </section>
      <div className='container-btn-form-edit-profile'>
        <button type='button' onClick={handleClose}>
          Close
        </button>
        <button className='btn-save-change' type='submit' onClick={handleSubmit(onSubmit)}>
          Save Change
        </button>
      </div>
    </form>
  )
}

export default FormEditProfile
