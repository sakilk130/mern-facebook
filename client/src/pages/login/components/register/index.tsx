import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import { memo } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { initialValues, validationSchema } from './formik/formik';
import styles from './styles/RegisterCardModal.module.css';
import { months } from './utils';

interface RegisterCardModalProps {
  onClose: () => void;
}

const RegisterCardModal = ({ onClose }: RegisterCardModalProps) => {
  const currentYear = new Date().getFullYear();

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema,
    enableReinitialize: true,
  });

  return (
    <>
      <header className={styles.modalHeader}>
        <div>
          <h2>Sign Up</h2>
          <p>It's quick and easy.</p>
        </div>
        <button type="button" onClick={onClose} className={styles.closeBtn}>
          <AiOutlineClose />
        </button>
      </header>
      <hr />
      <FormikProvider value={formik}>
        <Form>
          <div className={styles.form}>
            <div className={styles.formInputInRow}>
              <div>
                <Field
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  className={formik.errors.firstName && styles.redBorder}
                />
                <div className={styles.errorMessage}>
                  <ErrorMessage name="firstName" />
                </div>
              </div>
              <div>
                <Field
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  className={formik.errors.lastName && styles.redBorder}
                />
                <div className={styles.errorMessage}>
                  <ErrorMessage name="lastName" />
                </div>
              </div>
            </div>
            <div className={styles.formInput}>
              <Field
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                className={formik.errors.email && styles.redBorder}
              />
            </div>
            <div className={styles.errorMessage}>
              <ErrorMessage name="email" />
            </div>
            <div className={styles.formInput}>
              <Field
                type="password"
                name="password"
                id="password"
                placeholder="New Password"
                className={formik.errors.password && styles.redBorder}
              />
            </div>
            <div className={styles.errorMessage}>
              <ErrorMessage name="password" />
            </div>
            <div className={styles.dob}>
              <label htmlFor="dob">Date of Birth</label>
              <div className={styles.dateMonthYearWrap}>
                <div>
                  <Field
                    as="select"
                    name="dob.bDate"
                    id="month"
                    className={formik.errors.dob?.bDate && styles.redBorder}
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </Field>
                </div>
                <div>
                  <Field
                    as="select"
                    name="dob.bMonth"
                    id="month"
                    className={formik.errors.dob?.bDate && styles.redBorder}
                  >
                    {months.map((month) => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </Field>
                </div>
                <div>
                  <Field
                    as="select"
                    name="dob.bYear"
                    id="month"
                    className={formik.errors.dob?.bDate && styles.redBorder}
                  >
                    {Array.from({ length: 100 }, (_, i) => currentYear - i).map(
                      (year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ),
                    )}
                  </Field>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </>
  );
};

export default memo(RegisterCardModal);
