import { useContext } from "react";
import { AppContext } from "../context/app";

const useApp = () => useContext(AppContext);

export default useApp;
