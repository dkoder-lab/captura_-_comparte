import Logo from "./Logo";
import ButtonList from "./ButtonsList";
import MainTitle from "./MainTitle";

import "../styles/index.css";

export default function Auth() {
  return (
    <section className="Auth">
      <div className="content h-full grid">
        <Logo />
        <MainTitle />
        <ButtonList></ButtonList>
      </div>
    </section>
  );
}
