import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { variables } from "../constants/variable";
import Cookies from "js-cookie";

interface PatientRegister {
  full_name: string;
  birth_place: string;
  birth_date: string;
  gender: string;
  domicile: string;
}

const PatientRegister = () => {
  const token = localStorage.getItem("token");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [patientData, setPatientData] = useState<PatientRegister>({
    full_name: "",
    birth_place: "",
    birth_date: "",
    gender: "",
    domicile: "",
  });

  const [email, setEmail] = useState("");

  // Toggle the sidebar open/close
  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Toggle accordion items
  const handleAccordionToggle = (index: number) => {
    setOpenAccordion((prevIndex) => (prevIndex === index ? null : index));
  };

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value
    });
  };

  const submitUpdateData = async (e: FormEvent) => {
    e.preventDefault();

    const url = `${variables.BASE_URL}/patients`;

    try {
      await axios.post(url, JSON.stringify(patientData), {
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true
      });

      // navigate('/login');
      setPatientData({
        full_name: "",
        birth_place: "",
        birth_date: "",
        gender: "",
        domicile: "",
      });
    } catch (error) {
      
    }
  }

  useEffect(() => {
    console.log(patientData)
  }, [patientData])

  useEffect(() => {
    const fetchEmail = async () => {
      const url = `${variables.BASE_URL}/users/me`;

      try {
        const res = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        // console.log(res.data);
        setEmail(res.data.email);
      } catch(error) {

      }
    }

    fetchEmail();
  }, [])

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="bg-gray-100 w-full px-[6rem] py-[2rem]">
        <h1 className="font-medium text-sm mb-4">DATA DIRI</h1>
        <div className="flex gap-6 items-center">
          <div className="rounded-full border-2 w-[4rem] h-[4rem] bg-[#B9E5E8]"></div>
          <button className="border-2 text-blue bg-white py-2 px-4 rounded-md h-1/2 text-[#478CCF] font-bold">
            Upload Foto
          </button>
        </div>

        {/* form pasien */}
        <form className="mt-9 w-full min-h-screen">
          <div className="mb-5 w-full">
            <div className="text-[0.7rem] text-grey-100 font-bold mt-[3rem] mb-[0.8rem]">
              IDENTITAS PENGGUNA
            </div>
            <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-900">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="nama"
              name="full_name"
              value={patientData.full_name}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Nama Lengkap"
              required
            />
          </div>

          <div className="mb-5 flex gap-7 w-full">
            <div className="w-1/2">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="patient@gmail.com"
                required
              />
            </div>

            <div className="w-1/2">
              <label htmlFor="jenis-kelamin" className="block mb-2 text-sm font-medium text-gray-900">
                Jenis Kelamin
              </label>
              <select
                id="jenis-kelamin"
                name="gender"
                value={patientData.gender}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              >
                <option value="" disabled>
                  Pilih Jenis Kelamin
                </option>
                <option value="MALE">Laki-laki</option>
                <option value="FEMALE">Perempuan</option>
              </select>
            </div>
          </div>

          {/* Tempat & Tanggal Lahir */}
          <div className="mb-5 flex gap-7 w-full">
            <div className="w-1/2">
              <label htmlFor="tempatlahir" className="block mb-2 text-sm font-medium text-gray-900">
                Tempat Lahir
              </label>
              <input
                type="text"
                id="tempatlahir"
                name="birth_place"
                value={patientData.birth_place}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Tempat Lahir"
                required
              />
            </div>

            <div className="w-1/2">
              <label htmlFor="tanggal-lahir" className="block mb-2 text-sm font-medium text-gray-900">
                Tanggal Lahir
              </label>
              <input
                type="date"
                id="tanggal-lahir"
                name="birth_date"
                value={patientData.birth_date}
                onChange={handleChange}
                className="px-4 py-2 border rounded-md w-full"
              />
            </div>
          </div>

          {/* Alamat Domisili */}
          <div className="text-[0.7rem] text-grey-100 font-bold mt-[3rem] mb-[0.8rem]">
            ALAMAT IDENTITAS
          </div>
          <div>
            <label htmlFor="domicile" className="block mb-2 text-sm font-medium text-gray-900">
              Alamat Domisili
            </label>
            <textarea
              id="domicile"
              rows={4}
              name="domicile"
              value={patientData.domicile}
              onChange={handleChange}
              className="mb-8 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Masukkan Alamat Tempat Tinggal"
            ></textarea>
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            onClick={submitUpdateData}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientRegister;
