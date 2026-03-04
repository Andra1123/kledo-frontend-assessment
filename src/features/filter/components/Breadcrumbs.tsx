// 1. Definisikan tipe data untuk props-nya
interface BreadcrumbsProps {
  labels: {
    province: string;
    regency: string;
    district: string;
  };
}

// 2. Gunakan tipe tersebut di fungsi komponen
export const Breadcrumps = ({ labels }: BreadcrumbsProps) => {
  const { province, regency, district } = labels;

  return (
    <nav className="breadcrumb flex items-center bg-white py-6 px-8 mb-6 text-sm font-medium">
      {/* Indonesia */}
      <span className={!province ? "text-blue-600" : "text-gray-400"}>
        Indonesia
      </span>

      {/* Provinsi */}
      {province && (
        <>
          <span className="mx-2 font-bold text-gray-300">/</span>
          <span className={!regency ? "text-blue-600" : "text-gray-400"}>
            {province}
          </span>
        </>
      )}

      {/* Kota/Kabupaten */}
      {regency && (
        <>
          <span className="mx-2 font-bold text-gray-300">/</span>
          <span className={!district ? "text-blue-600" : "text-gray-400"}>
            {regency}
          </span>
        </>
      )}

      {/* Kecamatan */}
      {district && (
        <>
          <span className="mx-2 font-bold text-gray-300">/</span>
          <span className="text-blue-600">{district}</span>
        </>
      )}
    </nav>
  );
};
