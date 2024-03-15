import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";

interface Props {
  hotelId: string;
  pricePerNight: number;
}

interface GuestInfoFormType {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
}
const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormType>();

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <h3 className="text-md font-bold">${pricePerNight} per night</h3>
      <form action="">
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date: Date) => setValue("checkIn", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
