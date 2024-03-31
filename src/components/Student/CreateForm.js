import { useQuery } from "@tanstack/react-query";
import React from "react";
import { studentServices } from "../../api/studentServices";
import { queryKeys } from "../../query-keys";
import "./styles.css";

const CreateForm = ({ values, setValues }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const [_, value] of Object.entries(values)) {
      if (value === "") {
        alert("Vui lòng điền đầy đu thông tin");
        return;
      }
    }
    await studentServices.create(values);
  };
  const {} = useQuery({
    queryKey: [queryKeys.STUDENT],
    // queryFn:
  });
  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            value={values.name}
            onChange={(e) => {
              setValues((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
          />
        </div>
        <div className="group">
          <label htmlFor="age">Age:</label>
          <input
            id="age"
            type="number"
            value={values.age}
            onChange={(e) => {
              setValues((prev) => ({
                ...prev,
                age: e.target.value,
              }));
            }}
          />
        </div>
        <div className="group">
          <label htmlFor="city">City:</label>
          <input
            id="city"
            value={values.city}
            onChange={(e) => {
              setValues((prev) => ({
                ...prev,
                city: e.target.value,
              }));
            }}
          />
        </div>
        <div className="group">
          <label htmlFor="gender">Gender:</label>
          <div>
            <input
              type="radio"
              checked={values.gender === "female"}
              name="gender"
              value="female"
              onChange={(e) => {
                setValues((prev) => ({
                  ...prev,
                  gender: e.target.value,
                }));
              }}
            />
            Female
            <input
              type="radio"
              checked={values.gender === "male"}
              name="gender"
              value="male"
              onChange={(e) => {
                setValues((prev) => ({
                  ...prev,
                  gender: e.target.value,
                }));
              }}
            />
            Male
          </div>
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default CreateForm;
