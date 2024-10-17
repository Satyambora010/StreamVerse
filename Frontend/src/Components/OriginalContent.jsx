import ReactPlayer from 'react-player';
import Navbar from './Navbar';

const OriginalContent = () => {
  return (
    <div className='bg-black text-white h-screen w-full'>
        <Navbar />
        <div className='flex flex-col gap-10 bg-black py-10 px-5 md:px-20 w-full'>
        <h2 className='text-2xl font-bold py-5 w-full'>
        Original Content
        <div className="items-center w-full mt-10 px-10 rounded-lg">
        <ReactPlayer
                url="https://streamverse1.s3.ap-south-1.amazonaws.com/Videos/River.mp4" // The S3 URL of your video
                controls={true} // Show video controls
                width='100%'    // Responsive width
                height='auto'   // Responsive height
                className='rounded-lg'
        />
        </div>
      </h2>

        </div>
    </div>
  );
};

export default OriginalContent;
