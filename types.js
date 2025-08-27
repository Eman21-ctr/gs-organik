// File: src/types.js
// Catatan: Semua 'interface' dari file .ts dihapus karena merupakan fitur
// compile-time TypeScript dan tidak ada di JavaScript murni.
// Data Anda akan tetap memiliki struktur yang sama, tetapi tanpa pemeriksaan tipe formal.

/**
 * Kategori Produk
 * Digunakan untuk mengelompokkan produk yang dijual.
 * Sebelumnya: enum ProductCategory
 */
export const ProductCategory = {
  Hortikultura: "Hortikultura",
  ProdukOlahan: "Produk Olahan",
  Pupuk: "Pupuk",
  Ternak: "Ternak",
};

/**
 * Status Ketersediaan Produk
 * Menunjukkan apakah suatu produk siap dijual atau tidak.
 * Sebelumnya: enum ProductAvailability
 */
export const ProductAvailability = {
  Tersedia: "Tersedia",
  Habis: "Habis",
  SegeraPanen: "Segera Panen",
};

/**
 * Status Penyimpanan di Cold Storage
 * Menunjukkan apakah barang titipan masih ada atau sudah diambil.
 * Sebelumnya: enum ColdStorageStatus
 */
export const ColdStorageStatus = {
  Disimpan: "Disimpan",
  Diambil: "Diambil",
};