import { useContext, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { registerUser } from '../services/apiClient';
import { GameContext, useUser } from '../contexts';
import { Loading } from '../components/Loading';
import './Register.css';
import { requestStorageAccess, validateEmail } from '../util';
import { IUser } from '../types/type';
import YellowFlower from '../assets/yellow-flower.svg';
import BluePipeIcon from '../assets/blue-pipe.svg';
import YellowFireworkIcon from '../assets/yellow-firework.svg';
import FlagIcon from '../assets/flag.svg';
// import { Step } from '../types/type';

// type Props = {
//   setStep: (step: Step) => void;
// };

const convertToBase64 = (str: string): string => {
  return btoa(str);
};

const NewRegisterForm = ({
  onRegistered,
  onClickScrollToGame,
}: {
  onRegistered?: (data: IUser) => void;
  onClickScrollToGame: () => void;
}) => {
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

  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = { ...errors };
    if (!form.firstName) newErrors.firstName = '* Vui lòng điền Họ';
    else delete newErrors.firstName;
    if (!form.email) newErrors.email = '* Vui lòng điền Email';
    else if (!validateEmail(form.email)) newErrors.email = '* Email không hợp lệ';
    else delete newErrors.email;
    if (!form.company) newErrors.company = '* Vui lòng điền đơn vị công tác';
    else delete newErrors.company;
    if (!form.lastName) newErrors.lastName = '* Vui lòng điền Tên';
    else delete newErrors.lastName;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    const canUseCookies = await requestStorageAccess();
    await registerUser(form)
      .then(data => {
        if (!data) {
          setIsSubmitting(false);
          return;
        }
        setUserData(data);
        setIsSubmitting(false);
        setIsSuccess(true);
        if (canUseCookies) {
          Cookies.set('tethut2025email', convertToBase64(form.email), {
            expires: 10,
            sameSite: 'None',
            secure: true,
          });
        } else {
          onRegistered && onRegistered(data);
        }
      })
      .catch(error => {
        console.error('Đã có lỗi xảy ra. Vui lòng thử lại', error);
        setIsSubmitting(false);
      });
  };

  const isWeird = 2 * window.innerWidth / window.innerHeight >= 21 / 9;

  return (
    <div className="new-form-register" style={{
      height: isWeird ? "fit-content": "50dvh"
    }}>
      <div className="text-[24px] md:text-[48px] lg:text-[60px] text-white font-bold text-center mb-[40px] flex justify-center items-center">
        <span className="relative">
          Nhanh tay <span className="text-[#F80048]">đăng kí</span> ngay nào
          <div className="absolute right-[-12%] md:right-[-10%] top-0">
            <img src={YellowFlower} alt="yellow-flower" className="w-[32px] md:w-[48px] w-100" />
          </div>
        </span>
      </div>
      <div className="my-8 w-full  bg-transparent rounded-b-3xl relative">
        <div className="my-8 w-full mx-auto max-w-[calc(100%-32px)] sm:max-w-[600px] md:max-w-[728px] lg:max-w-[800px] border border-[#3BFFEF] rounded-lg bg-transparent relative">
          {isSuccess ? (
            <div className="h-[500px] flex justify-center	 items-center">
              <div className="flex flex-col items-center justify-center gap-y-4">
                <div className="text-white p-6 text-xl md:text-3xl lg:text-4xl font-bold flex flex-col justify-center gap-2 items-center">
                  <div>Đăng ký thành công</div>
                  <div className="text-center">
                    Bạn có thể tham gia <span className="text-[#FF0048]">xin quẻ</span> ngay bây giờ
                    để có cơ hội nhận quà độc quyền từ TikTok
                  </div>
                  {/* <a
                    href="#game"
                    className="max-w-fit min-w-[128px] py-3 px-8 text-black text-[16px] sm:text-[20px] md:min-w-[196px] md:p-4 rounded-full md:text-[20px] bg-[#3bfff4] border border-white mt-5 flex justify-center items-center outline-none cursor-pointer hover:opacity-80"
                  >
                    Rút quẻ ngay
                  </a> */}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-8 p-4 md:px-8 md:py-8 flex flex-col gap-2 sm:gap-2 items-center rounded-lg">
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
          )}

          <div className="absolute top-[10%] left-[-10%] hidden lg:block">
            <img src={YellowFireworkIcon} alt="pen" className="w-[64px]" />
          </div>
          <div className="absolute top-[-8%] left-[-15%] hidden lg:block">
            <img src={BluePipeIcon} alt="confetti" className="w-[100px]" />
          </div>
        </div>
        <div className="absolute bottom-[0%] left-[0%] hidden lg:block">
          <img src={FlagIcon} alt="confetti" className="w-[200px]" />
        </div>
      </div>
    </div>
  );
};

export default NewRegisterForm;
