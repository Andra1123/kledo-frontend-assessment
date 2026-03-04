import { useLoaderData } from "react-router-dom";
import { useFilter } from "./hooks/useFilter";
import { Breadcrumps } from "./components/Breadcrumbs";
import { IoIosArrowDown } from "react-icons/io";
import { MdFilterAltOff } from "react-icons/md";
import { IoEarthSharp } from "react-icons/io5";
import { FaArrowDownLong } from "react-icons/fa6";
import { BiBuilding, BiBuildings, BiBuildingHouse } from "react-icons/bi";

// 1. Definisi Tipe Data agar TypeScript tidak error
interface Region {
  id: number;
  name: string;
  province_id?: number;
  regency_id?: number;
}

interface LoaderData {
  provinces: Region[];
  regencies: Region[];
  districts: Region[];
}

export default function Filter() {
  // 2. Ambil data dari loader (Mode Data)
  const { provinces, regencies, districts } = useLoaderData() as LoaderData;

  // 3. Gunakan hook filter untuk mengelola URL
  const { province, regency, district, updateFilter, resetFilter } =
    useFilter();

  // 4. Logika Filtering Berjenjang
  // Filter Kota berdasarkan Provinsi yang dipilih (id di URL adalah string, di JSON adalah number)
  const availableRegencies = regencies.filter(
    (r) => r.province_id === Number(province),
  );

  // Filter Kecamatan berdasarkan Kota yang dipilih
  const availableDistricts = districts.filter(
    (d) => d.regency_id === Number(regency),
  );

  // Fungsi pembantu untuk mendapatkan nama wilayah untuk ditampilkan
  const getLabel = (list: Region[], id: string) =>
    list.find((item) => item.id === Number(id))?.name || "";

  const labels = {
    province: getLabel(provinces, province),
    regency: getLabel(regencies, regency),
    district: getLabel(districts, district),
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* SIDEBAR FILTER */}
      <aside className="w-72 bg-gray-100 p-6 shadow-sm ">
        <div className="flex gap-1.5">
          <span className="bg-blue-100 flex items-center justify-center p-1.5 rounded-md">
            <IoEarthSharp className="text-blue-500 text-xl" />
          </span>
          <h2 className="text-xl font-bold">Frontend Assesment</h2>
        </div>

        <div className="space-y-6 mt-12">
          <p className="uppercase text-xs font-semibold text-gray-400">
            filter wilayah
          </p>
          {/* Dropdown Provinsi */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
              Provinsi
            </label>
            <div className="relative flex justify-between items-center w-full border-2 border-gray-300 rounded-lg">
              {labels.province && (
                <BiBuilding
                  className={"text-blue-600 ps-2 text-2xl absolute"}
                />
              )}
              <select
                name="province"
                value={province}
                onChange={(e) => updateFilter("province", e.target.value)}
                className={`w-full p-2 z-10 appearance-none outline-none cursor-pointer transition-all ${
                  province ? "ps-8" : "ps-2"
                }`}
              >
                <option value="">Pilih Provinsi</option>
                {provinces.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <IoIosArrowDown className="absolute right-2" />
            </div>
          </div>

          {/* Dropdown Kota - Aktif jika Provinsi dipilih */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
              Kota/Kabupaten
            </label>
            <div className="relative flex justify-between items-center w-full border-2 border-gray-300 rounded-lg">
              {labels.regency && (
                <BiBuildingHouse
                  className={"text-blue-600 ps-2 text-2xl absolute"}
                />
              )}
              <select
                name="regency"
                value={regency}
                disabled={!province}
                onChange={(e) => updateFilter("regency", e.target.value)}
                className={`w-full p-2 z-10 appearance-none outline-none cursor-pointer transition-all ${
                  regency ? "ps-8" : "ps-2"
                }`}
              >
                <option value="">Pilih Kota/Kabupaten</option>
                {availableRegencies.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
              <IoIosArrowDown className="absolute right-2" />
            </div>
          </div>

          {/* Dropdown Kecamatan - Aktif jika Kota dipilih */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
              Kecamatan
            </label>
            <div className="relative flex justify-between items-center w-full border-2 border-gray-300 rounded-lg">
              {labels.district && (
                <BiBuildings
                  className={"text-blue-600 ps-2 text-2xl absolute"}
                />
              )}
              <select
                name="district"
                value={district}
                disabled={!regency}
                onChange={(e) => updateFilter("district", e.target.value)}
                className={`w-full p-2 z-10 appearance-none outline-none cursor-pointer transition-all ${
                  district ? "ps-8" : "ps-2"
                }`}
              >
                <option value="">Pilih Kecamatan</option>
                {availableDistricts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              <IoIosArrowDown className="absolute right-2" />
            </div>
          </div>

          {/* Tombol Reset */}
          <button
            onClick={resetFilter}
            className="w-full mt-8 py-2 bg-blue-200 border-blue-400 border-2 font-semibold rounded-lg"
          >
            <div className="flex items-center justify-center gap-1.5">
              <MdFilterAltOff />
              Reset Filter
            </div>
          </button>
        </div>
      </aside>

      {/* KONTEN UTAMA */}
      <main className="flex-1 flex flex-col">
        {/* Breadcrumb dengan class sesuai instruksi */}
        <Breadcrumps labels={labels} />

        <div className="flex-1 flex flex-col items-center justify-center p-10">
          <div
            className={
              !labels.province ? "hidden" : "grid gap-10 text-center space-y-2"
            }
          >
            <div>
              <p className="uppercase text-blue-400 text-sm">provinsi</p>
              <h1 className="text-5xl font-black text-gray-800">
                {labels.province}
              </h1>
            </div>

            {labels.regency && (
              <>
                <FaArrowDownLong className="text-lg mx-auto opacity-20" />
                <div>
                  <p className="uppercase text-blue-400 text-sm">Kabupaten</p>
                  <h2 className="text-3xl font-bold">{labels.regency}</h2>
                </div>
              </>
            )}

            {labels.district && (
              <>
                <FaArrowDownLong className="text-lg mx-auto opacity-20" />

                <div>
                  <p className="uppercase text-blue-400 text-sm">kecamatan</p>
                  <h3 className="text-2xl font-bold">{labels.district}</h3>
                </div>
              </>
            )}
          </div>
          {!province && (
            <p className="text-gray-400 italic">
              Silakan pilih provinsi di sidebar untuk memulai.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
