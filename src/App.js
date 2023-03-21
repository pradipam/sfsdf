import React, { Component, useState, useEffect } from "react";
import ReactDom from "react-dom";
import uuid from "uuid";
import { Add } from "./practice/actions/InformationAction";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import styled from "styled-components";

export default function App() {
  const dispatch = useDispatch();
  const [Data, SetData] = useState();
  const infoData = useSelector((state) => state.Informaton);
  useEffect(() => {
    SetData(infoData);
  }, [infoData]);

  const LoginSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is required")
      .matches(/^[A-Za-z]+$/i, "should accept only alphanumeric values"),
    lastName: Yup.string()
      .required("Last Name is required")
      .matches(/^[A-Za-z]+$/i, "should accept only alphanumeric values"),
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        "should accept only alphanumeric values"
      ),
    age: Yup.number()
      .required("Age is required")
      .min(18, "age must be greater than 18")
      .max(99, "age must be less than 99"),
    dob: Yup.string()
      .required("Birth Date is required")
      .matches(/^\d{1,2}\/\d{1,2}\/\d{4}$/, "should accept only dd/mm/yyyy"),
  });

  const GenderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const submitForm = (values) => {
    values.id = uuid();
    dispatch(Add(values));
  };

  const SubmitButton = styled.div`
    display: flex;
    justify-content: center;
  `;

  console.log(Data);
  return (
    <>
      <Container>
        <h1 className="text-center">Information Form </h1>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            age: "",
            gender: "",
            dob: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={submitForm}
        >
          {({ touched, errors, handleChange, handleBlur, resetForm}) => (
            <Form>
              <Col lg={12}>
                <Row>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <Field
                        type="text"
                        name="firstName"
                        placeholder="Enter First Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className={`form-control ${
                          touched.firstName && errors.firstName
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="firstName"
                        className="invalid-feedback"
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="Last Name">Last Name</label>
                      <Field
                        type="text"
                        name="lastName"
                        placeholder="Enter Last Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className={`form-control ${
                          touched.lastName && errors.lastName
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="lastName"
                        className="invalid-feedback"
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="email">Email </label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        className={`form-control ${
                          touched.email && errors.email ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="email"
                        className="invalid-feedback"
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="Age">Age</label>
                      <Field
                        type="number"
                        name="age"
                        placeholder="Enter Age"
                        className={`form-control ${
                          touched.age && errors.age ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="age"
                        className="invalid-feedback"
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="Gender">Gender</label>
                      <Select
                        placeholder="Select Gender"
                        onBlur={handleBlur}
                        options={GenderOptions}
                        onChange={(selectedOption) => {
                        handleChange("gender")(selectedOption.value);
                        }}
                        name="gender"
                      />
                      <ErrorMessage
                        component="div"
                        name="gender"
                        className="invalid-feedback"
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="email">Birth Date</label>
                      <Field
                        type="text"
                        name="dob"
                        placeholder="Enter Birth Date"
                        className={`form-control ${
                          touched.dob && errors.dob ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="dob"
                        className="invalid-feedback"
                      />
                    </div>
                  </Col>
                </Row>
                <SubmitButton>
                  <Col md={2}>
                    <button type="submit" className="btn btn-primary btn-block">
                      Submit
                    </button>
                  </Col>
                  <Col md={2}>
                  <button type="reset" className="btn btn-danger btn-block" onClick={resetForm}>
                    Reset All
                  </button>
                  </Col>
                </SubmitButton>
              </Col>
            </Form>
          )}
        </Formik>
        <Row>
          <Col md={12} className="mt-5">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>age</th>
                  <th>Ge nder</th>
                  <th>Birth Date</th>
                </tr>
              </thead>
              <tbody>
                {Data !== undefined && Data.length !== 0 ? (
                  Data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.email}</td>
                      <td>{item.age}</td>
                      <td>{item.gender}</td>
                      <td>{item.dob}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No Data Found{" "}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}
