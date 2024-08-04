import { useState } from 'react';
import Cookies from 'js-cookie';
import { registerUser } from '../services/apiClient';
import { useUser } from '../contexts';
import { Loading } from '../components/Loading';
import './Register.css';
// import { Step } from '../types/type';

// type Props = {
//   setStep: (step: Step) => void;
// };

const convertToBase64 = (str: string): string => {
  return btoa(str);
};

const NewRegisterForm = () => {
  const { setUserData } = useUser();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
  });

  const [errors, setErrors] = useState<{
    firstName?: string;
    email?: string;
    company?: string;
    lastName?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = { ...errors };
    if (!form.firstName) newErrors.firstName = '* Vui lòng điền Họ';
    if (!form.email) newErrors.email = '* Vui lòng điền Email';
    if (!form.company) newErrors.company = '* Vui lòng điền đơn vị công tác';
    if (!form.lastName) newErrors.lastName = '* Vui lòng điền Tên';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    await registerUser(form)
      .then(data => {
        if (!data) {
          setIsSubmitting(false);
          return;
        }
        setUserData(data);
        setIsSubmitting(false);
        Cookies.set('tethut2025email', convertToBase64(form.email), { expires: 365 });
      })
      .catch(error => {
        console.error('Đã có lỗi xảy ra. Vui lòng thử lại', error);
        setIsSubmitting(false);
      });
  };

  return (
    <div className="new-form-register">
      <div className="my-8 w-full max-w-[calc(100%-32px)] sm:max-w-[600px] md:max-w-[728px] lg:max-w-[800px] border border-[#3BFFEF] rounded-lg	 bg-transparent rounded-b-3xl relative">
        <div className="mt-8 p-4 md:px-8 md:py-8 flex flex-col gap-2 sm:gap-2 items-center">
          <div className="w-full">
            <input
              placeholder="Họ *"
              className="p-2 md:p-4 w-full rounded-lg placeholder:text-black outline-none h-[70px]"
              onChange={e => setForm({ ...form, firstName: e.target.value })}
            />
            <p className="text-white text-xs ms-5 h-4 mt-1">{errors.firstName}</p>
          </div>
          <div className="w-full">
            <input
              placeholder="Tên *"
              className="p-2 md:p-4 w-full rounded-lg placeholder:text-black outline-none h-[70px]"
              onChange={e => setForm({ ...form, lastName: e.target.value })}
            />
            <p className="text-white text-xs ms-5 h-4 mt-1">{errors.lastName}</p>
          </div>
          <div className="w-full">
            <input
              type="email"
              placeholder="Địa chỉ email *"
              className="p-2 md:p-4 w-full rounded-lg placeholder:text-black outline-none h-[70px]"
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <p className="text-white text-xs ms-5 h-4 mt-1">{errors.email}</p>
          </div>
          <div className="w-full">
            <input
              placeholder="Đơn vị công tác *"
              className="p-2 md:p-4 w-full rounded-lg placeholder:text-black outline-none h-[70px]"
              onChange={e => setForm({ ...form, company: e.target.value })}
            />
            <p className="text-white text-xs ms-5 h-4 mt-1">{errors.company}</p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="max-w-fit min-w-[128px] p-2 text-[16px] sm:text-[20px] md:min-w-[196px] md:p-4 rounded-full md:text-[20px] bg-[#3bfff4] border border-white mt-4 flex justify-center items-center outline-none hover:opacity-80"
          >
            {isSubmitting ? <Loading /> : 'Gửi thông tin'}
          </button>
        </div>
        {/* <div className="absolute bottom-[-10%] right-[-18%] hidden md:block lg:block">
          <img src={PenIcon} alt="pen" className="w-100 mt-4" />
        </div>
        <div className="absolute top-[-2%] left-[-17.5%] hidden md:block lg:block">
          <img src={ConfettiIcon} alt="confetti" className="w-100 mt-4" />
        </div> */}
      </div>
    </div>
  );
};

export default NewRegisterForm;