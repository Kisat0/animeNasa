import { CircularProgress } from "@material-ui/core";

export const Loader = () => {
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100%",
    }}
  >
    <CircularProgress />
  </div>;
};
