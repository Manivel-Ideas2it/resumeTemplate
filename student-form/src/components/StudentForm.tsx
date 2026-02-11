import React, { useState } from "react";
import type { StudentFormData } from "../types";
import "./studentForm.css";

const StudentForm = () => {
  const subjects = ["Tamil", "English", "Maths", "Science", "Social"];

  const [form, setForm] = useState<StudentFormData>({
    name: "",
    rollNo: "",
    className: "",
    marks: [{ subject: "", mark: "" }],
  });

  const [showTable, setShowTable] = useState(false);
  const [submittedData, setSubmittedData] = useState<StudentFormData | null>(
    null,
  );

  const isValidMark = (mark: string) =>
    /^\d+$/.test(mark) && Number(mark) >= 0 && Number(mark) <= 100;

  const isValidRoll = (rollNo: string) => /^\d+$/.test(rollNo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubjectChange = (index: number, value: string) => {
    const list = [...form.marks];
    list[index].subject = value;

    setForm({ ...form, marks: list });
  };

  const handleMarkChange = (index: number, value: string) => {
    if (value && !/^\d*$/.test(value)) return;

    const list = [...form.marks];
    list[index].mark = value;

    if (
      index === form.marks.length - 1 &&
      value !== "" &&
      form.marks.length < subjects.length
    ) {
      list.push({ subject: "", mark: "" });
    }

    setForm({ ...form, marks: list });
  };

  const getRemaining = (index: number) => {
    const selected = form.marks.map((m) => m.subject);

    return subjects.filter(
      (s) => !selected.includes(s) || s === form.marks[index].subject,
    );
  };

  const isEmpty = (v: string) => v.trim().length === 0;

  const cleanedMarks = form.marks.filter(
    (mark, index) =>
      !(index === form.marks.length - 1 && mark.subject === "" && mark.mark === ""),
  );

  const canSubmit =
    !isEmpty(form.name) &&
    isValidRoll(form.rollNo) &&
    !isEmpty(form.className) &&
    cleanedMarks.length === subjects.length &&
    cleanedMarks.every((mark) => mark.subject !== "" && isValidMark(mark.mark));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedMarks = form.marks.filter(
      (mark, index) =>
        !(index === form.marks.length - 1 && mark.subject === "" && mark.mark === ""),
    );

    setSubmittedData({ ...form, marks: cleanedMarks });
    setShowTable(true);
    setForm({
      name: "",
      rollNo: "",
      className: "",
      marks: [{ subject: "", mark: "" }],
    });
  };

  return (
    <div className="container">
      <h2>Student Form</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name : </label>
          <input
            id="name"
            name="name"
            placeholder="Enter name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="rollNo">Roll No : </label>
          <input
            id="rollNo"
            name="rollNo"
            placeholder="Numbers only"
            value={form.rollNo}
            onChange={handleChange}
          />

          {form.rollNo && !isValidRoll(form.rollNo) && (
            <span className="error">Roll must be numbers only</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="className">Class : </label>
          <input
            id="className"
            name="className"
            placeholder="Enter class"
            value={form.className}
            onChange={handleChange}
          />
        </div>

        <h3>Subjects</h3>

        {form.marks.map((item, index) => (
          <div key={index} className="row">
            <select
              value={item.subject}
              onChange={(e) => handleSubjectChange(index, e.target.value)}
            >
              <option value="">Select</option>

              {getRemaining(index).map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>

            {item.subject && (
              <div style={{ width: "100%" }}>
                <input
                  type="number"
                  min={0}
                  max={100}
                  placeholder="0-100"
                  value={item.mark}
                  onChange={(e) => handleMarkChange(index, e.target.value)}
                />

                {item.mark && !isValidMark(item.mark) && (
                  <span className="error">Mark must be 0-100</span>
                )}
              </div>
            )}
          </div>
        ))}

        {canSubmit && (
          <button className="btn-submit">
            Submit
          </button>
        )}
      </form>

      {showTable && submittedData && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>Class</th>
              {subjects.map((s) => (
                <th key={s}>{s}</th>
              ))}
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{submittedData.name}</td>
              <td>{submittedData.rollNo}</td>
              <td>{submittedData.className}</td>
              {subjects.map((s) => {
                const found = submittedData.marks.find(
                  (m) => m.subject === s,
                );
                return <td key={s}>{found?.mark ?? "-"}</td>;
              })}
              <td>
                {submittedData.marks.reduce(
                  (a, b) => a + Number(b.mark),
                  0,
                )}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentForm;
