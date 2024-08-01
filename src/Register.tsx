import { useState } from 'react';
import { registerUser } from './services/apiClient';
import { useUser } from './contexts';
import { Loading } from './components/Loading';

const RegisterForm = () => {
  const { setUserData } = useUser();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const { email } = form;
    if (!email) {
      alert('Email is required');
      return;
    }
    setIsSubmitting(true);
    await registerUser(form)
      .then(data => {
        console.log('User registered successfully:', data);
        setUserData(data);
        setIsSubmitting(false);
      })
      .catch(error => {
        console.error('Đã có lỗi xảy ra. Vui lòng thử lại', error);
        setIsSubmitting(false);
      });
  };

  return (
    <div id="form-register">
      <div className="my-8 w-full max-w-[calc(100%-32px)] sm:max-w-[600px] md:max-w-[728px] lg:max-w-[800px] border border-black bg-[#fd0048] rounded-b-3xl">
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
        <div className="mt-8 p-4 md:p-8 flex flex-col gap-2 sm:gap-4 items-center">
          <div className="flex flex-row flex-wrap w-full gap-2 sm:gap-4">
            <input
              placeholder="Họ"
              className="bg-[#f4f000] p-2 md:p-4 w-full sm:w-[calc(50%-8px)] rounded-lg placeholder:text-black outline-none	"
              onChange={e => setForm({ ...form, firstName: e.target.value })}
            />
            <input
              placeholder="Tên"
              className="bg-[#f4f000] p-2 md:p-4 w-full sm:w-[calc(50%-8px)] rounded-lg placeholder:text-black outline-none	"
              onChange={e => setForm({ ...form, lastName: e.target.value })}
            />
          </div>
          <input
            placeholder="Địa chỉ email"
            className="bg-[#f4f000] p-2 md:p-4 w-full rounded-lg placeholder:text-black outline-none"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <input
            placeholder="Đơn vị công tác"
            className="bg-[#f4f000] p-2 md:p-4 w-full rounded-lg placeholder:text-black outline-none"
            onChange={e => setForm({ ...form, company: e.target.value })}
          />
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="max-w-fit min-w-[128px] p-2 text-[16px] sm:text-[20px] md:min-w-[196px] md:p-4 rounded-full font-bold md:text-[24px] bg-[#3bfff4] mt-4 flex justify-center items-center outline-none"
          >
            {isSubmitting ? <Loading /> : 'Gửi'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
