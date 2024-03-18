import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import {
  PaymentIntentResponse,
  UserType,
} from "../../../../backend/src/shared/types";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";
import { useSearchContext } from "../../contexts/SearchContext";

interface Props {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
}

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const { showToast } = useAppContext();
  const search = useSearchContext();
  const { hotelId } = useParams();
  const { mutate: bookRoom, isLoading } = useMutation(
    apiClient.createRoomBooking,
    {
      onSuccess: () => {
        showToast({ message: "Booking saved", type: "SUCCESS" });
      },
      onError: () => {
        showToast({ message: "Error saving booking", type: "ERROR" });
      },
    }
  );

  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      ...currentUser,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    const result = await stripe?.confirmCardPayment(
      paymentIntent.clientSecret,
      {
        payment_method: {
          card: elements?.getElement(CardElement) as StripeCardElement,
        },
      }
    );

    if (result?.paymentIntent?.status === "succeeded") {
      // book the room

      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 rounded-lg gap-4 p-5 border border-slate-300 h-fit"
    >
      <h3 className="text-3xl font-bold">Confirm You Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <label className="text-gray-700 font-bold text-sm flex-1">
          First Name
          <input
            type="text"
            readOnly
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            {...register("firstName")}
          />
        </label>
        <label className="text-gray-700 font-bold text-sm flex-1">
          Last Name
          <input
            type="text"
            readOnly
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            {...register("lastName")}
          />
        </label>
        <label className="text-gray-700 font-bold text-sm flex-1">
          Email
          <input
            type="text"
            readOnly
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            {...register("email")}
          />
        </label>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>
      </div>

      <div className="bg-blue-200 rounded-md p-4">
        <div className="font-semibold text-lg">
          Total Cost: ${paymentIntent.totalCost.toFixed(2)}
        </div>
        <div className="text-xs">Includes taxes and charges</div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Payment Details</h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-3 text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-600 font-bold text-white p-2 hover:bg-blue-500 text-md disabled:bg-gray-500"
        >
          {isLoading ? "Saving..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
