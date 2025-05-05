import ClipLoader from "react-spinners/ClipLoader";
import { CSSProperties } from "react";

interface SpinnerProps {
  loading: boolean;
  overlay?: boolean;
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

const defaultOverride: CSSProperties = {
  display: "block",
  margin: "100px auto",
};

const Spinner = ({
  loading,
  overlay = false,
  size = 150,
  color = "#3b82f6",
  className = "",
  style = {},
}: SpinnerProps) => {
  if (!loading) return null;

  const spinnerElement = (
    <ClipLoader
      color={color}
      loading={loading}
      cssOverride={{ ...defaultOverride, ...style }}
      size={size}
      aria-label="Loading Spinner"
      aria-busy={loading}
      className={className}
      role="status"
      data-testid="spinner"
    />
  );

  if (overlay) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        data-testid="spinner-overlay"
      >
        {spinnerElement}
      </div>
    );
  }

  return spinnerElement;
};

export default Spinner;
