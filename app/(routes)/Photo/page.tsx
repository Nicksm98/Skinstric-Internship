import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Photo = () => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <header className="h-16 pt-[16px] flex flex-col gap-8 px-8">
        <div className="flex items-center gap-4">
          <Link href="/">
            <p className="font-semibold text-[14px] tracking-wide">SKINSTRIC</p>
          </Link>
          <div className="flex items-center text-[17px] tracking-widest">
            [<p className="px-2 text-sm tracking-tighter">INTRO</p>]
          </div>
        </div>
        <div className="font-semibold text-[16px]">TO START ANALYSIS</div>
      </header>
      <main className="h-[100%] flex items-center justify-around bg-white text-black">
        {/* Camera Icon Section */}
        <div className="relative box-container h-[400px] w-[400px] flex items-center justify-center">
          <div className="box box-3 flex items-center justify-center">
            <div className="box box-2 flex items-center justify-center">
              <div className="box box-1 flex items-center justify-center"></div>
            </div>
          </div>
          <img
            className="absolute h-[120px] w-[120px] object-contain"
            src="/assets/camera-icon.png"
            alt="Camera Icon"
          />
          {/* Text and Line for Camera */}
          <div className="absolute top-[70%] left-[50%] transform -translate-x-[50%] translate-y-[50%] text-center">
            <span className="text-sm font-semibold">ALLOW A.I.<br />TO SCAN YOUR FACE</span>
            <div className="absolute w-[80px] h-[1px] bg-black top-[-20px] left-[50%] transform -translate-x-1/2"></div>
          </div>
        </div>

        {/* Gallery Icon Section */}
        <div className="relative box-container h-[400px] w-[400px] flex items-center justify-center">
          <div className="box box-3 flex items-center justify-center">
            <div className="box box-2 flex items-center justify-center">
              <div className="box box-1 flex items-center justify-center"></div>
            </div>
          </div>
          <img
            className="absolute h-[120px] w-[120px] object-contain"
            src="/assets/gallery.png"
            alt="Gallery Icon"
          />
          {/* Text and Line for Gallery */}
          <div className="absolute bottom-[70%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] text-center">
            <span className="text-sm font-semibold">ALLOW A.I.<br />ACCESS GALLERY</span>
            <div className="absolute w-[80px] h-[1px] bg-black bottom-[-20px] left-[50%] transform -translate-x-1/2"></div>
          </div>
        </div>

        {/* Back Button */}
        <div className="left-btn absolute left-[32px] bottom-[40px] flex items-center justify-center">
          <div className="outer w-[34px] h-[34px] border-[2px] border-black transform rotate-45 flex items-center justify-center">
            <div className="inner w-[34px] h-[34px] border-dotted border-[2px] border-black flex items-center justify-center">
              <Link href="/Introduction">
                <Button className="left-btn bg-transparent hover:bg-transparent -rotate-45">
                  <div className="w-0 h-0 border-l-5 border-r-5 border-b-8 transform rotate-270 border-transparent border-b-black"></div>
                </Button>
              </Link>
            </div>
          </div>
          <div className="left-btn ml-7 text-sm tracking-wide">BACK</div>
        </div>
      </main>
    </div>
  );
};

export default Photo;
