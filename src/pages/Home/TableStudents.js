import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { studentServices } from "../../api/studentServices";
import Modal from "../../components/Modal";
import AddOrEditStudent from "../../components/Modal/ContentModal/AddOrEditStudent";
import useApp from "../../hook/useApp";
import { queryKeys } from "../../query-keys";

const TableStudents = ({ students }) => {
  const navigate = useNavigate();
  const { openModal, setOpenModal } = useApp();
  const [detailStudent, setDetailStudent] = useState(undefined);
  const [mode, setMode] = useState("add");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => studentServices.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.STUDENT] });
    },
  });

  const handleDeleteStudent = (id) => {
    mutation.mutate(id);
  };
  return (
    <>
      <div className="relative mt-6 shadow-md sm:rounded-lg">
        <div
          onClick={() => {
            setOpenModal(true);
            setMode("add");
            setDetailStudent(undefined);
          }}
          className="absolute right-5 -top-12 cursor-pointer flex items-center justify-center text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full w-8 h-8"
        >
          +
        </div>
        <table border={1} className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6">
                Ảnh đại diện
              </th>
              <th scope="col" className="py-3 px-6">
                Họ và tên
              </th>
              <th scope="col" className="py-3 px-6">
                Tuổi
              </th>
              <th scope="col" className="py-3 px-6">
                Giới tính
              </th>
              <th scope="col" className="py-3 px-6">
                Điểm
              </th>
              <th scope="col" className="py-3 px-6">
                Thành phố
              </th>
              <th scope="col" className="py-3 px-6 text-center">
                <span className="">Hành động</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students?.map((student, index) => (
                <tr key={index} className="border-b bg-white hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <img
                      src="https://tanstack.com/favicon.ico"
                      alt="student"
                      className="h-5 w-5"
                    />
                  </td>
                  <th
                    onClick={() => navigate(`/students/${student.id}`)}
                    scope="row"
                    className="text-blue-500 hover:underline cursor-pointer whitespace-nowrap py-4 px-6 font-medium"
                  >
                    {student?.name}
                  </th>
                  <td className="py-4 px-6">{student?.age}</td>
                  <td className="py-4 px-6">{student?.gender}</td>
                  <td className="py-4 px-6">{student?.mark}</td>
                  <td className="py-4 px-6">{student?.city ?? "chưa có"}</td>
                  <td className="py-4 px-6 text-center">
                    <button
                      className="mr-5 font-medium text-blue-600 hover:underline dark:text-blue-500"
                      onClick={() => {
                        setMode("update");
                        setDetailStudent(student);
                        setOpenModal(true);
                      }}
                    >
                      Cập nhật
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(student.id)}
                      className="font-medium text-red-600 dark:text-red-500"
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-4 px-6">Chưa có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={openModal} onCloseModal={() => setOpenModal(false)}>
        <AddOrEditStudent mode={mode} detailStudent={detailStudent} />
      </Modal>
    </>
  );
};

export default TableStudents;
