import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Container } from "../components/Layout/Container";
import { useLegacyAnimations } from "../hooks/useLegacyAnimations";

export function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // parity: drive the same show/hide + hi/line animations on route change
  useLegacyAnimations({
    path: location.pathname,
    onBack: () => navigate("/")
  });

  return (
    <Container>
      <Outlet />
    </Container>
  );
}
