import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { studentServices } from "../../../api/studentServices";
import useApp from "../../../hook/useApp";
import { queryKeys } from "../../../query-keys";
import { schema } from "../../../validation/student";

const initialValues = {
  name: "",
  age: "",
  gender: "female",
  mark: "",
  city: "",
};

const AddOrEditStudent = ({ mode, detailStudent }) => {
  const { openModal, setOpenModal } = useApp();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => {
      return mode === "add"
        ? studentServices.create(data)
        : studentServices.update(detailStudent.id, data);
    },
  });
  const onSubmit = (data) => {
    mutation.mutate(data, {
      onError: (error) => {
        const msgError = error.response.statusText;
        alert(msgError);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.STUDENT],
          predicate: (query) => {},
        });
        setOpenModal();
        mutation.reset();
        reset(initialValues);
      },
    });
  };

  useEffect(() => {
    if (!openModal) reset(initialValues);
    if (openModal && detailStudent) {
      reset(detailStudent);
    }
  }, [openModal, reset, detailStudent]);
  return (
    <div className="w-full p-4">
      <h1 className="font-semibold text-lg text-center">{`${
        mode === "add" ? "Thêm mới học sinh" : "Chỉnh sửa học sinh"
      }`}</h1>
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <div className="mb-6">
                <div className="group relative z-0 w-full">
                  <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    type="text"
                    name="name"
                    id="name"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                    placeholder=" "
                    autoComplete="false"
                  />
                  <label
                    htmlFor="name"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
                  >
                    Họ và tên
                  </label>
                </div>
                <p className="text-red-600 text-sm mt-2">
                  {errors?.name && errors.name.message}
                </p>
              </div>
            )}
          />

          <Controller
            name="age"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="mb-6">
                <div className="group relative z-0  w-full">
                  <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    type="text"
                    name="age"
                    id="age"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                    placeholder=" "
                    autoComplete="false"
                  />
                  <label
                    htmlFor="age"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
                  >
                    Tuổi
                  </label>
                </div>
                <p className="text-red-600 text-sm mt-2">
                  {errors?.age && errors.age.message}
                </p>
              </div>
            )}
          />

          <Controller
            name="gender"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className=" mb-6">
                <div className="flex items-center gap-3 w-full">
                  <h2>Giới tính:</h2>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <input
                        value="male"
                        onChange={(e) => onChange(e.target.value)}
                        checked={value === "male"}
                        id="gender-1"
                        type="radio"
                        name="gender"
                        className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 "
                      />
                      <label
                        htmlFor="gender-1"
                        className="ml-2 text-sm font-medium text-gray-900"
                      >
                        Male
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        value="female"
                        onChange={(e) => onChange(e.target.value)}
                        defaultChecked
                        checked={value === "female"}
                        id="gender-2"
                        type="radio"
                        name="gender"
                        className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 "
                      />
                      <label
                        htmlFor="gender-2"
                        className="ml-2 text-sm font-medium text-gray-900"
                      >
                        Female
                      </label>
                    </div>
                  </div>
                </div>
                <p className="text-red-600 text-sm mt-2">
                  {errors?.gender && errors.gender.message}
                </p>
              </div>
            )}
          />

          <Controller
            name="mark"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className=" mb-6">
                <div className="group relative z-0 w-full">
                  <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    type="text"
                    name="mark"
                    id="mark"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                    placeholder=" "
                    autoComplete="false"
                  />
                  <label
                    htmlFor="mark"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
                  >
                    Điểm số
                  </label>
                  <p className="text-red-600 text-sm mt-2">
                    {errors?.mark && errors.mark.message}
                  </p>
                </div>
              </div>
            )}
          />
          <Controller
            name="city"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="mb-6">
                <div className="group relative z-0 w-full">
                  <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    type="text"
                    name="city"
                    id="city"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                    placeholder=" "
                    autoComplete="false"
                  />
                  <label
                    htmlFor="city"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
                  >
                    Thành phố
                  </label>
                  <p className="text-red-600 text-sm mt-2">
                    {errors?.city && errors.city.message}
                  </p>
                </div>
              </div>
            )}
          />

          <button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            className="w-full rounded-lg bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 "
          >
            {mode === "add" ? "Thêm" : "Cập nhật"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddOrEditStudent;
