function JobReferenceFeatures() {
    return (
        <div className="mt-8 p-10 bg-gradient-to-b from-teal-100 via-white to-gray-50 rounded-2xl shadow-xl">
            <h1 className="text-4xl font-extrabold text-teal-700 text-center mb-10 tracking-wide">
                Selamat Datang di Situs Referensi Karier Impian Anda!
            </h1>
            <p className="text-center text-gray-600 text-xl mb-12 leading-relaxed">
                Kami hadir untuk memberikan pengalaman terbaik dalam pencarian pekerjaan. Dengan fitur-fitur mutakhir, Anda dapat menemukan karier yang sesuai dengan preferensi Anda secara cepat dan efisien.
            </p>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="text-teal-600 text-4xl mb-4">📌</div>
                    <p className="text-center text-gray-700 text-lg">
                        <span className="font-bold">Pencarian Pekerjaan</span> yang mudah dengan filter canggih sesuai lokasi, kategori, dan preferensi Anda.
                    </p>
                </div>
                <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="text-teal-600 text-4xl mb-4">📊</div>
                    <p className="text-center text-gray-700 text-lg">
                        <span className="font-bold">K-Means Clustering</span> untuk memahami pola pekerjaan favorit dan preferensi kerja Anda.
                    </p>
                </div>
                <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="text-teal-600 text-4xl mb-4">🏢</div>
                    <p className="text-center text-gray-700 text-lg">
                        Informasi lengkap tentang <span className="font-bold">perusahaan, kategori pekerjaan</span>, hingga <span className="font-bold">link pekerjaan yang langsung</span> mengarah ke situsnya.
                    </p>
                </div>
                <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="text-teal-600 text-4xl mb-4">📈</div>
                    <p className="text-center text-gray-700 text-lg">
                        <span className="font-bold">Tampilan interaktif</span> untuk memvisualisasikan data pekerjaan secara intuitif dan menarik.
                    </p>
                </div>
                <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="text-teal-600 text-4xl mb-4">⚙️</div>
                    <p className="text-center text-gray-700 text-lg">
                        Dibangun dengan <span className="font-bold">komponen modern</span> menggunakan <span className="font-bold">Flask sebagai backend</span> dan <span className="font-bold">React js sebagai frontend</span> untuk tampilan profesional.
                    </p>
                </div>
                <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="text-teal-600 text-4xl mb-4">🚀</div>
                    <p className="text-center text-gray-700 text-lg">
                        <span className="font-bold">Optimalkan pencarian kerja</span> Anda dengan teknologi mutakhir yang responsif di semua perangkat.
                    </p>
                </div>
            </div>
            <p className="text-center text-gray-500 text-lg mt-12">
                Yuk mulai eksplorasi Anda sekarang dan wujudkan karier impian bersama kami!
            </p>
        </div>
    );
}

export default JobReferenceFeatures;
