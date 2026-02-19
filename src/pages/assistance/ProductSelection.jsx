// src/pages/assistance/ProductSelection.jsx
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";

export default function ProductSelection() {
  const navigate = useNavigate();

  return (
    <PageWrapper
      showBack={true}
      backTo="/assistance"
      code={true}
    >
      <div className="w-full max-w-md mt-2">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          Product
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          Select your Ethnocare product to get started
        </p>

        {/* Product options will be added here later */}
      </div>
    </PageWrapper>
  );
}
