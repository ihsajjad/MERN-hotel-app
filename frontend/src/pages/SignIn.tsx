import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Sign in successcull!", type: "SUCCESS" }); // show the
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" }); // show the toast
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>

      <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "Email is required!" })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </label>

      <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "Password is required!",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </label>
      <div className="flex items-center justify-between">
        <span>
          Not Registered?{" "}
          <Link className="underline" to="/register">
            Create an account
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};

export default SignIn;
