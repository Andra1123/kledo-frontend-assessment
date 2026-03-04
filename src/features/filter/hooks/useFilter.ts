import { useSearchParams } from "react-router-dom";

export const useFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Ambil nilai dari URL (Data ini tetap ada meski di-refresh)
  const province = searchParams.get("province") || "";
  const regency = searchParams.get("regency") || "";
  const district = searchParams.get("district") || "";

  // 2. Fungsi untuk memperbarui filter
  const updateFilter = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    // LOGIKA PENTING: Reset pilihan di bawahnya jika induknya berubah
    // Jika Provinsi diganti, maka Kota dan Kecamatan harus dihapus dari URL
    if (name === "province") {
      params.delete("regency");
      params.delete("district");
    }
    // Jika Kota diganti, maka Kecamatan harus dihapus dari URL
    else if (name === "regency") {
      params.delete("district");
    }

    setSearchParams(params);
  };

  // 3. Fungsi untuk mengosongkan semua filter (Tombol Reset)
  const resetFilter = () => {
    setSearchParams({});
  };

  return {
    province,
    regency,
    district,
    updateFilter,
    resetFilter,
  };
};
