import config from "@/data/config";
import style from "./style.module.css";
import Image from "next/image";
import LoginForm from "@/presentation/components/organisms/LoginForm";

const LoginPage = () => {
  return (
    <div className={style.login}>
      <div className={style.image_container}>
        <div className={style.image}>
          <Image
            src={"/images/logo.svg"}
            width="757"
            height="305"
            alt={`Logo de ${config.APP_NAME}`}
          />
        </div>
      </div>

      <ul className={style.squares}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className={style.form_container}>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
