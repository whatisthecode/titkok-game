import { useState } from 'react';
import { Loading } from '../components/Loading';
import { updateUser } from '../services/apiClient';
import { useUser } from '../contexts';
import { Step } from '../types/type';
import WatermelonIcon from '../assets/watermelon.svg';
import BluePipe from '../assets/blue-pipe.svg';
import YellowFirework from '../assets/yellow-firework.svg';

import './GiftForm.css';

type Props = {
  setStep: (step: Step) => void;
};

type Form = {
  fullName: string;
  phone: string;
  address: string;
  email: string;
  company: string;
  title: string;
};

const GiftForm = ({
  onSendInfo
} : {
  onSendInfo: () => void;
}) => {
  const { userData, setUserData } = useUser();

  const [form, setForm] = useState<Form>({
    fullName:
      userData?.firstName && userData?.lastName ? `${userData.firstName} ${userData.lastName}` : '',
    phone: '',
    address: '',
    email: userData?.email || '',
    company: userData?.company || '',
    title: '',
  });
  const [errors, setErrors] = useState<Form>({
    fullName: '',
    phone: '',
    address: '',
    email: '',
    company: '',
    title: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = { ...errors };
    if (!form.address) newErrors.address = '* Vui lòng điền địa chỉ nhà';
    if (!form.email) newErrors.email = '* Vui lòng điền Email';
    if (!form.company) newErrors.company = '* Vui lòng điền đơn vị công tác';
    if (!form.title) newErrors.title = '* Vui lòng điền chức vụ';
    if (!form.fullName) newErrors.fullName = '* Vui lòng điền họ tên';
    if (!form.phone) newErrors.phone = '* Vui lòng điền số điện thoại';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    await updateUser({
      ...userData,
      ...form,
      isRewarded: true,
    })
      .then(data => {
        if (!data) {
          setIsSubmitting(false);
          return;
        }
        setUserData(data);
        setIsSubmitting(false);
        onSendInfo && onSendInfo();
        // setStep('letter');
      })
      .catch(error => {
        console.error('Đã có lỗi xảy ra. Vui lòng thử lại', error);
        setIsSubmitting(false);
      });
  };

  return (
    <div id="form-gift">
      <div className="my-8 w-full max-w-[calc(100%-32px)] sm:max-w-[600px] flex flex-col items-center relative">
        <div className="w-full bg-[#fd0048] rounded-[32px] p-6 gap-2 md:rounded-[72px] md:p-12 flex flex-col md:gap-0">
          <div className="mb-1">
            <input
              placeholder="Họ tên *"
              className="p-2 md:p-4 w-full rounded-full placeholder:text-black mb-1"
              value={form.fullName}
              onChange={e => setForm({ ...form, fullName: e.target.value })}
              required
            />
            <p className="text-white text-xs ms-5 h-4">{errors.fullName}</p>
          </div>
          <div className="mb-1">
            <input
              placeholder="Số điện thoại *"
              className="p-2 md:p-4 w-full rounded-full placeholder:text-black mb-1"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              required
            />
            <p className="text-white text-xs ms-5 h-4">{errors.phone}</p>
          </div>

          <div className="mb-1">
            <input
              placeholder="Địa chỉ nhà *"
              className="p-2 md:p-4 w-full rounded-full placeholder:text-black mb-1"
              value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })}
              required
            />
            <p className="text-white text-xs ms-5 h-4">{errors.address}</p>
          </div>

          <div className="mb-1">
            <input
              placeholder="Địa chỉ email *"
              className="p-2 md:p-4 w-full rounded-full placeholder:text-black mb-1"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              type="email"
            />
            <p className="text-white text-xs ms-5 h-4">{errors.email}</p>
          </div>

          <div className="mb-1">
            <input
              placeholder="Đơn vị công tác *"
              className="p-2 md:p-4 w-full rounded-full placeholder:text-black mb-1"
              value={form.company}
              onChange={e => setForm({ ...form, company: e.target.value })}
              required
            />
            <p className="text-white text-xs ms-5 h-4">{errors.company}</p>
          </div>

          <div className="mb-1">
            <input
              placeholder="Chức vụ *"
              className="p-2 md:p-4 w-full rounded-full placeholder:text-black mb-1"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              required
            />
            <p className="text-white text-xs ms-5 h-4">{errors.title}</p>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="max-w-fit min-w-[128px] p-2 text-[16px] sm:text-[20px] md:min-w-[196px] md:p-4 rounded-full font-bold md:text-[24px] bg-[#3bfff4] mt-4 flex justify-center items-center outline-none hover:opacity-80"
        >
          {isSubmitting ? <Loading /> : 'Gửi thông tin'}
        </button>
        <div className="absolute top-[-15%] right-[5%] ">
          <img
            src={WatermelonIcon}
            alt="watermelon"
            className="md:w-[128px] md:h-[128px] w-[92px] h-[92px]"
          />
        </div>
        <div className="absolute bottom-[5%] left-[-8%] ">
          <img
            src={BluePipe}
            alt="blue-pipe"
            className="md:w-[128px] md:h-[128px] w-[92px] h-[92px]"
          />
        </div>
        <div className="absolute top-[-20%] md:top-[-18%] right-0 ">
          <img
            src={YellowFirework}
            alt="yellow-firework"
            className="md:w-[64px] md:h-[64px] w-[48px] h-[48px]"
          />
        </div>
      </div>
    </div>
  );
};

export default GiftForm;
