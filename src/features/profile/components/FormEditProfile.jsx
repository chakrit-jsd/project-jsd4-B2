import { useForm } from 'react-hook-form';
import { Input, Select } from '../../../components/shared/Input';
import { yupResolver } from '@hookform/resolvers/yup'
import DropAndCrop from './DropAndCrop';

const FormEditProfile = () => {


  return (
      <form>
        <div>
          <DropAndCrop/>
        </div>
      </form>
  )
}

export default FormEditProfile
