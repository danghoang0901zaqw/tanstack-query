import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { studentServices } from "../../api/studentServices";
import Pagiantion from "../../components/Pagination";
import { queryKeys } from "../../query-keys";
import TableStudents from "./TableStudents";
export default function HomePage() {
  const [paginate, setPaginate] = useState({
    _page: 1,
    _limit: 10,
  });

  const { isError, error, data, isLoading } = useQuery({
    queryKey: [queryKeys.STUDENT, { ...paginate }],
    queryFn: () => studentServices.getAll(paginate),
    staleTime: 5 * 1000,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        Đang tải dữ liệu...
      </div>
    );
  if (isError) return <div>Error: {error.message}</div>;

  const { data: students, pagination } = data;
  const totalPage = Math.ceil(pagination._totalRows / paginate._limit);

  return (
    <>
      <div className="mt-5">
        <h1 className="text-lg text-center">Danh sách học sinh</h1>
        <TableStudents students={students} />
        <Pagiantion
          totalPage={totalPage}
          paginate={paginate}
          onChangePage={(page) =>
            setPaginate((prev) => ({ ...prev, _page: page }))
          }
        />
      </div>
    </>
  );
}
