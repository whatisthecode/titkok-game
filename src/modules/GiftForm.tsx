
const GiftForm = () => {
    return (
        <div id="form-gift">
            <div className="my-8 w-full max-w-[calc(100%-32px)] sm:max-w-[600px] flex flex-col items-center">
                <div className="w-full bg-[#fd0048] rounded-[32px] p-6 gap-2 md:rounded-[72px] md:p-12 flex flex-col md:gap-4">
                    <input placeholder="Họ tên" className="p-2 md:p-4 w-full rounded-full placeholder:text-black" />
                    <input placeholder="Số điện thoại" className="p-2 md:p-4 w-full rounded-full placeholder:text-black" />
                    <input placeholder="Địa chỉ nhà" className="p-2 md:p-4 w-full rounded-full placeholder:text-black" />
                    <input placeholder="Địa chỉ email" className="p-2 md:p-4 w-full rounded-full placeholder:text-black" />
                    <input placeholder="Chức vụ và đơn vị công tác" className="p-2 md:p-4 w-full rounded-full placeholder:text-black" />
                </div>
                <button className="max-w-fit min-w-[128px] p-2 text-[16px] sm:text-[20px] md:min-w-[196px] md:p-4 rounded-full font-bold md:text-[24px] bg-[#3bfff4] mt-4">
                    Gửi thông tin
                </button>
            </div>
        </div>
    )
}

export default GiftForm;