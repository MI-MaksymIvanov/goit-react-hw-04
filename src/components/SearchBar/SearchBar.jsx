import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";

import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit, initialQuery }) {
  return (
    <Formik
      className={css.searchBarForm}
      initialValues={{ query: initialQuery || "" }}
      onSubmit={(values, actions) => {
        if (!values.query.trim()) {
          toast.error("Please enter a search query!");

          return;
        }

        onSubmit(values.query);
        actions.resetForm({ values: { query: values.query } });
      }}
    >
      <Form className={css.searchBarForm}>
        <Field
          className={css.searchBarInput}
          type="text"
          name="query"
          placeholder="Search images and photos"
        />
        <button className={css.searchBarBtn} type="submit">
          Search
        </button>
      </Form>
    </Formik>
  );
}
