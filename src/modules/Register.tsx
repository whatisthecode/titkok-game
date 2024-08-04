import { useState } from 'react';
import { registerUser } from '../services/apiClient';
import { useUser } from '../contexts';
import { Loading } from '../components/Loading';
import PenIcon from '../assets/pen.svg';
import ConfettiIcon from '../assets/confetti.svg';
import './Register.css';
import { Step } from '../types/type';

type Props = {
  setStep: (step: Step) => void;
};

const RegisterForm = ({ setStep }: Props) => {
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
    console.log(validateForm());
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
        setStep('result');
      })
      .catch(error => {
        console.error('Đã có lỗi xảy ra. Vui lòng thử lại', error);
        setIsSubmitting(false);
      });
  };

  return (
    <div id="form-register">
      <div className="my-8 w-full max-w-[calc(100%-32px)] sm:max-w-[600px] md:max-w-[728px] lg:max-w-[800px] border border-black bg-[#fd0048] rounded-b-3xl relative">
        <div className="border border-black rounded-b-[100px] text-white mt-[2px] py-8 text-center w-[calc(100%-2px)] mx-auto">
          <span className="block font-bold text-[24px] min-[375px]:text-[32px] min-[425px]:text-[40px] min-[525px]:text-[48px] md:text-[72px]">
            Nhanh tay kẻo lỡ hội
          </span>
          <span className="block font-bold text-[12px] min-[375px]:text-[16px] min-[425px]:text-[20px] min-[525px]:text-[24px] md:text-[32px]">
            Nhanh tay đăng ký ngay nào
          </span>
          <span className="block font-bold text-[12px] min-[375px]:text-[16px] min-[425px]:text-[20px] min-[525px]:text-[24px] md:text-[32px]">
            Xin quẻ may mắn - nhận quà liền tay
          </span>
        </div>
        <div className="mt-8 p-4 md:px-[4.875rem] md:py-8 flex flex-col gap-2 sm:gap-2 items-center">
          <div className="flex flex-row flex-wrap w-full gap-2 sm:gap-4">
            <div className="w-full sm:w-[calc(50%-8px)]">
              <input
                placeholder="Họ *"
                className="bg-[#f4f000] p-2 md:p-4 w-full rounded-lg placeholder:text-black outline-none	h-[70px]"
                onChange={e => setForm({ ...form, firstName: e.target.value })}
              />
              <p className="text-white text-xs ms-5 h-4 mt-1">{errors.firstName}</p>
            </div>
            <div className="w-full sm:w-[calc(50%-8px)]">
              <input
                placeholder="Tên *"
                className="bg-[#f4f000] p-2 md:p-4 w-full rounded-lg placeholder:text-black outline-none	h-[70px]"
                onChange={e => setForm({ ...form, lastName: e.target.value })}
              />
              <p className="text-white text-xs ms-5 h-4 mt-1">{errors.lastName}</p>
            </div>
          </div>
          <div className="w-full">
            <input
              type="email"
              placeholder="Địa chỉ email *"
              className="bg-[#f4f000] p-2 md:p-4 w-full rounded-lg placeholder:text-black outline-none h-[70px]"
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <p className="text-white text-xs ms-5 h-4 mt-1">{errors.email}</p>
          </div>
          <div className="w-full">
            <input
              placeholder="Đơn vị công tác *"
              className="bg-[#f4f000] p-2 md:p-4 w-full rounded-lg placeholder:text-black outline-none h-[70px]"
              onChange={e => setForm({ ...form, company: e.target.value })}
            />
            <p className="text-white text-xs ms-5 h-4 mt-1">{errors.company}</p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="max-w-fit min-w-[128px] p-2 text-[16px] sm:text-[20px] md:min-w-[196px] md:p-4 rounded-full font-bold md:text-[24px] bg-[#3bfff4] mt-4 flex justify-center items-center outline-none hover:opacity-80"
          >
            {isSubmitting ? <Loading /> : 'Gửi thông tin'}
          </button>
        </div>
        <div className="absolute bottom-[-10%] right-[-18%] hidden md:block lg:block">
          <img src={PenIcon} alt="pen" className="w-100 mt-4" />
        </div>
        <div className="absolute top-[-2%] left-[-17.5%] hidden md:block lg:block">
          <img src={ConfettiIcon} alt="confetti" className="w-100 mt-4" />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
