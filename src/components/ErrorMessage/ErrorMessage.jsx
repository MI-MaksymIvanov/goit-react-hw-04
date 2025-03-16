import css from "./ErrorMassege.module.css";

export default function ErrorMassege({ message }) {
  return <p className={css.errorMassege}>{message}</p>;
}
