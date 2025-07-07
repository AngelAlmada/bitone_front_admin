// src/components/RegisterRouteWrapper.tsx
import { useNavigate } from "react-router-dom";
import RegisterUser from "./registerUsers";

const RegisterRouteWrapper = () => {
  const navigate = useNavigate();

  return (
    <RegisterUser onRegisterSuccess={() => navigate("/dashboard")} />
  );
};

export default RegisterRouteWrapper;
