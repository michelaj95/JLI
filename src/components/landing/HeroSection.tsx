import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      navigate("/lessons");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
          <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Welcome to</span>{' '}
                <span className="block text-primary xl:inline">K'NOW Israel</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                Embark on a journey of discovery and connection with Israel. Our platform offers engaging lessons and meaningful conversations to deepen your understanding and strengthen your relationship with Israel.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button
                    onClick={handleGetStarted}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-primary/90 md:py-4 md:px-10 md:text-lg"
                  >
                    Get Started
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button
                    onClick={() => navigate("/about")}
                    variant="outline"
                    className="flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium md:py-4 md:px-10 md:text-lg"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="relative lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-contain sm:h-72 md:h-96 lg:h-full lg:w-full"
          src="https://ngvjxscjejkjojvntjay.supabase.co/storage/v1/object/public/General%20images/soldier_image-PNG.png?t=2025-01-02T07%3A04%3A11.499Z"
          alt="IDF Soldier"
        />
      </div>
    </div>
  );
};

export default HeroSection;