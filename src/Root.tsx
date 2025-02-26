import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PatientList from "./pages/PatientList";
import PatientRegister from "./pages/PatientRegister";
import RawatJalanSchedule from "./pages/RawatJalanSchedule";
import RawatJalanRegister from "./pages/RawatJalanRegister";
import PatientDetail from "./pages/PatientDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DocterSchedule from "./pages/DocterSchedule";
import ScheduleList from "./pages/ScheduleList";
import AddSchedule from "./pages/AddSchedule";

const Root = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/patient" element={<PatientList />} />
        <Route path="/patient/register" element={<PatientRegister />} />
        <Route path="/rawat_jalan" element={<RawatJalanSchedule />} />
        <Route path="/rawat_jalan/register" element={<RawatJalanRegister />} />
        <Route path="/patient_detail" element={<PatientDetail />} />
        <Route path="/jadwal_praktik" element={<DocterSchedule />} />
        <Route path="/jadwal_praktik/list" element={<ScheduleList />} />
        <Route path="/jadwal_praktik/doc-144523" element={<AddSchedule />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Suspense>
  );
};

export default Root;
