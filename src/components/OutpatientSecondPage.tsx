import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import Sidebar from "./Sidebar";
import { AvailableQueueSchedule, DoctorMenuRegister } from "../pages/RawatJalanRegister";
import { getEcryptedLocalStorage } from "../utils/local-storage-crypto";
import { variables } from "../constants/variable";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import "./cal.css";
import { useNavigate } from "react-router-dom";

interface QueueSchedule {
  queueNo: number;
  startTime: string;
  endTime: string;
  availableStatus: boolean;
}

export const OutpatientSecondePage = (props: { queues: AvailableQueueSchedule[], selectedDoctor: DoctorMenuRegister }) => {
  const navigate = useNavigate();
  const { selectedDoctor } = props;

  const [queueArrays, setQueueArrays] = useState<QueueSchedule[]>([]);
  const token = localStorage.getItem("token");

  const selectedDoc = JSON.parse(getEcryptedLocalStorage("doctorMenu") || "{}");
  const { doctorId, consultDate } = selectedDoc;

  const [selectedDate, setSelectedDate] = useState<string>(consultDate);
  const [date, setDate] = useState<Date>(new Date());

  const fetchSchedulePageTwo = async () => {
    if (!doctorId || !selectedDate) return;

    const url = `${variables.BASE_URL}/doctors/${doctorId}/schedules?consult_date=${selectedDate}`;

    try {
      const res = await axios.get<QueueSchedule[]>(url, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true
      });

      setQueueArrays(res.data || []);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  useEffect(() => {
    console.log(queueArrays);

    fetchSchedulePageTwo();
  }, [selectedDate]);

  const handleConsultDate = (selectedDate: Date) => {
    const formattedDateISO = selectedDate.toISOString().split("T")[0];
    setSelectedDate(formattedDateISO);
    setDate(selectedDate);
  };

  const resetAndGoBackToPageOne = () => {
    localStorage.removeItem("doctorMenu");

    navigate(0);
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      <Sidebar />

      {/* Kontainer Utama */}
      <div className="w-full flex px-10 py-6 gap-10 ml-12">
        {/* Kiri: Info & Kalender */}
        <div className="bg-white shadow-md p-6 rounded-lg w-2/3">
          {/* Kalender */}
          <div className="mt-6 w-full">
            <Calendar
              onChange={setDate}
              onClickDay={handleConsultDate}
              value={date}
              className="w-full border-none shadow-sm rounded-md"
            />
            <div className="ml-9">
              {/* Submit Button */}
              <button
                onClick={resetAndGoBackToPageOne}
                type="submit"
                className="mt-8 mr-3 text-[#478CCF] border-1 border-blue-500 bg-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Kembali
              </button>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>

        {/* Kanan: Pilih Waktu */}
        <div className="bg-white shadow-md p-6 rounded-lg w-1/3">
          <h2 className="text-lg font-semibold mb-4">Pilih Waktu</h2>
          <p className="text-gray-600 mb-2">Tanggal yang dipilih: <strong>{selectedDate}</strong></p>
          <p className="text-gray-600 mb-2">Doktor: <strong>{date.toDateString()}</strong></p>

          {/* List Waktu */}
          <div className="grid grid-cols-2 gap-3">
            {queueArrays.length > 0 ? (
              queueArrays.map((queue, index) => (
                <button
                  key={index}
                  className={`py-3 text-center border rounded-lg shadow-sm text-gray-700 hover:bg-blue-500 hover:text-white transition 
                  ${queue.availableStatus ? "hover:bg-blue-500 hover:text-white" : "opacity-50 cursor-not-allowed shadow-md"} `}>
                  {queue.startTime}
                </button>
              ))
            ) : (
              <p className="text-gray-500">Tidak ada jadwal tersedia</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
