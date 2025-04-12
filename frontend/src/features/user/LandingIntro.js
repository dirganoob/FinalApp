import TemplatePointers from "./components/TemplatePointers";

function LandingIntro() {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content w-full h-full p-0">
                <div className="w-full h-full">
                    {/* Gambar memenuhi tinggi dan lebar */}
                    <img 
                        src="./worker.jpg" 
                        alt="Dashwind Admin Template" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

export default LandingIntro;
