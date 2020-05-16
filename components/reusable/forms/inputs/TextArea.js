import React from "react";

const TextArea = ({ label, type, field, form, prepend, icon, ...props }) => {
  let valid = form.errors[field.name] ? "is-invalid" : null;
  return (
    <div className="form-group mb-3">
      <div class="input-group mb-1 ">
        <textarea
          type={type}
          {...field}
          className={`form-control ${valid}`}
          {...props}
        />
      </div>

      {
        <div style={{ fontSize: "10px", color: "red" }}>
          {form.errors[field.name]}
        </div>
      }
    </div>
  );
};

export default TextArea;
