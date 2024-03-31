import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required("Vui lòng điền đầy đủ họ tên"),
  age: yup
    .number()
    .typeError("Vui lòng điền số tuổi")
    .required("Vui lòng điền số tuổi")
    .positive("Tuổi phải lớn hơn 0")
    .integer("Tuổi không hơp lệ"),
  gender: yup.string().required("Vui lòng chọn giới tính"),
  mark: yup
    .number()
    .typeError("Vui lòng điền số điểm")
    .required("Vui lòng điền số điểm")
    .positive("Điểm phải là số dương")
    .min(0, "Điểm số phải lớn hơn hoặc bằng 0")
    .max(10, "Điểm số phải nhỏ hơn hoặc bằng 10"),
  city: yup.string().required("Vui lòng nhập thành phố của bạn"),
});
