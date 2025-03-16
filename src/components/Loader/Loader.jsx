import { RingLoader } from "react-spinners";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loaderWrapper}>
      <RingLoader size={40} color={"#36d7b7"} />
    </div>
  );
}
