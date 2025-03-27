import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import ParallaxImage from "@/components/Animation";

export const LandingPage = () => {
  const { authUser } = useAuthStore();
  return (
    <div className="g2 relative h-full w-full overflow-hidden pt-5 md:pt-10 overflow-x-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/sc_bg_img.png')",
          backgroundSize: "contain",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="container relative z-100">
        <div className="flex justify-between items-center">
          <div>
            <img src="/Sec-logo.svg" alt="socket" width={150} height={95} />
          </div>
          <div className="flex items-center gap-4">
            {!authUser ? (
              <Link to="/signup">
                <button className="bg-wl1 hover:bg-wl3 border-2 border-wl2 text-bl1 font-semibold text-xs py-1 px-2 rounded-xl md:text-sm">
                  Signup
                </button>
              </Link>
            ) : (
              ""
            )}

            <Link to="/signin">
              <button className="bg-wl1 hover:bg-wl3 border-2 border-wl2 text-bl1 font-semibold text-xs py-1 px-2 rounded-xl md:text-sm">
                Signin
              </button>
            </Link>
          </div>
        </div>

        <div className="relative flex flex-col-reverse md:flex-row items-center justify-between gap-10 mt-20">
          <div className="w-[320px] md:w-[480px]">
            <h2 className="text-wl2 text-center text-3xl md:text-start md:text-4xl xl:text-6xl font-extrabold">
              Chat That's All About Tech & Innovation
            </h2>
            <p className="body-1 text-center md:text-start font-medium">
              Socket-Chat is the ultimate space for developers and tech
              enthusiasts to connect. Stay ahead with the latest trends, discuss
              programming, AI and build a community that thrives on
              knowledge-sharing.
            </p>
          </div>
          <div className="relative w-[300px] md:w-[400px] xl:w-[600px] shadow-2xl">
            <div className="relative rounded-[10px] g6 px-2 py-2 md:px-3 md:pt-3 z-10 shadow-2xl shadow-bl1/50">
              <img
                src="/images/chatpg.png"
                alt="chat"
                className="object-cover rounded-md"
              />
              <div className="relative w-[285px] md:w-[375px] xl:w-[575px] p-1 mt-2 rounded bg-pc1 ring-bl2 flex justify-between items-center md:mt-4 md:rounded-[10px] mx-auto">
                <div>
                  <img
                    src="/images/PC1.svg"
                    alt="pc1"
                    className="max-sm:size-4"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/PC2.svg"
                    alt="pc2"
                    className="max-sm:size-2"
                  />
                  <img
                    src="/images/PC2.svg"
                    alt="pc2"
                    className="max-sm:size-2"
                  />
                  <img
                    src="/images/PC3.svg"
                    alt="pc3"
                    className="max-sm:size-4"
                  />
                </div>
              </div>
            </div>
            <div className="absolute">
              <img
                src="/images/scrobo.png"
                alt="robo"
                className="size-14 md:size-20"
              />
            </div>
          </div>
        </div>

        <div className="relative my-32">
          <ParallaxImage
            src="/images/fry_sc.png"
            alt="fry"
            initialTop={-80}
            speed={0.2}
          />
          <div className="relative z-10 bg-wl3/10 backdrop-blur-[100px] border border-wl1/20 shadow-lg rounded-4xl">
            <div className="flex flex-col-reverse md:flex-row justify-between items-center">
              <div className="relative w-[340px] md:w-[648px]">
                <div className="relative px-8 py-4 lg:px-32 lg:py-16 m-6 g5 rounded-4xl">
                  <img
                    src="/images/sigChat.png"
                    alt="single-chat"
                    className="rounded-xl lg:rounded-2xl lg:hover:scale-105 lg:transition-all lg:duration-500"
                  />
                </div>
              </div>
              <div className="relative w-[300px] md:w-[480px] mx-2 mt-4 md:mx-auto">
                <div className="text-wl2 text-4xl text-start font-extrabold uppercase">
                  make tech discussins more engaging
                </div>
                <div className="body-1 text-start font-medium">
                  Enhance your conversations with tech-related stickers, Share
                  code snippets and AI-generated insights. Personalize your
                  profile, set a unique status, and showcase your expertise —
                  because in Socket-Chat, every developer, enthusiast, and
                  creator has a voice.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative my-40">
          <div className="relative z-10 bg-wl3/10 backdrop-blur-[100px] border border-wl1/20 shadow-lg rounded-4xl">
            <div className="flex flex-col-reverse md:flex-row-reverse justify-between items-center">
              <div className="relative w-[340px] md:w-[648px]">
                <div className="relative px-8 py-4 lg:px-32 lg:py-16 m-6 g3 rounded-4xl">
                  <div className="flex items-center justify-center">
                    <img
                      src="/images/group.png"
                      alt="single-chat"
                      className="rounded-xl lg:rounded-2xl lg:hover:scale-105 lg:transition-all lg:duration-500 object-contain h-96"
                    />
                  </div>
                </div>
              </div>
              <div className="relative w-[300px] md:w-[480px] mx-2 mt-4 md:mx-auto">
                <div className="text-wl2 text-4xl text-start font-extrabold uppercase ml-2">
                  Connect, Collaborate, and Grow
                </div>
                <div className="body-1 text-start font-medium ml-2">
                  Find your people and join groups that match your interests.
                  Whether you're a developer, designer, tech enthusiast, or just
                  someone eager to learn, Socket-Chat brings together
                  like-minded individuals. Engage in meaningful discussions,
                  share insights, and stay updated with the latest trends in
                  technology.
                </div>
              </div>
            </div>
          </div> 
        </div>

        <div className="my-40 relative">
          <div className="bg-wl3/10 backdrop-blur-[100px] border border-wl1/20 shadow-lg rounded-4xl">
            <div className="flex flex-col-reverse md:flex-row justify-between items-center">
              <div className="relative w-[340px] md:w-[648px]">
                <div className="relative px-8 py-4 lg:px-32 lg:py-16 m-6 g4 rounded-4xl">
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src="/images/user1.png"
                      alt="single-chat"
                      className="rounded-xl lg:rounded-2xl lg:hover:scale-105 lg:transition-all lg:duration-500 object-contain"
                    />
                  </div>
                </div>
              </div>
              <div className="relative w-[300px] md:w-[480px] mx-2 mt-4 md:mx-auto">
                <div className="text-wl2 text-4xl text-start font-extrabold uppercase">
                  Showcase Your Expertise
                </div>
                <div className="body-1 text-start font-medium">
                  Every user in Socket-Chat has a unique status to highlight
                  their skills and passions. Whether you're a seasoned
                  developer, a rising tech enthusiast, or a creative innovator,
                  your profile reflects your journey. Let others know what
                  drives you, display your expertise, and connect with
                  like-minded individuals—because in Socket-Chat, every voice
                  matters.
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -top-150 left-250 z-100">
            <ParallaxImage
              src="/images/onion.png"
              alt="onion"
              initialTop={0}
              speed={0.2}
            />
          </div>
        </div>

        <div className="mt-40 mb-16 relative">
          <div className="bg-wl3/10 backdrop-blur-[100px] border border-wl1/20 shadow-lg rounded-4xl">
            <div className="flex flex-col-reverse md:flex-row-reverse justify-between items-center">
              <div className="relative w-[340px] md:w-[648px]">
                <div className="relative px-8 py-4 lg:px-16 lg:py-16 m-6 g1 rounded-4xl">
                  <img
                    src="/images/online.png"
                    alt="single-chat"
                    className="rounded-xl lg:rounded-2xl lg:hover:scale-105 lg:transition-all lg:duration-500 object-contain"
                  />
                </div>
              </div>
              <div className="relative w-[300px] md:w-[480px] mx-2 mt-4 md:mx-auto">
                <div className="text-wl2 text-4xl text-start font-extrabold uppercase ml-2">
                  See Who's Online and Join the Conversation
                </div>
                <div className="body-1 text-start font-medium ml-2">
                  Stay connected with your community in real time. Whether users
                  are discussing the latest tech trends, collaborating on
                  projects, or just hanging out, you'll always know who's
                  active.
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -top-200 -z-1">
            <ParallaxImage
              src="/images/ball_sc.png"
              alt="ball"
              initialTop={0}
              speed={0.2}
            />
          </div>
        </div>

        <div className="relative">
        <div className="absolute -top-200 left-250 -z-1">
            <ParallaxImage
              src="/images/coin_sc.png"
              alt="ball"
              initialTop={0}
              speed={0.2}
            />
          </div>
        <div className="text-wl1 text-lg mx-auto md:text-2xl lg:text-4xl lg:mx-40 font-extrabold text-center">
          YOU CAN'T SCROLL ANYMORE. BETTER GO CHAT.
          <div className="mt-10 mb-32">
            <Link to="/signup">
              <button className="bg-wl1 hover:bg-wl3 border-2 border-wl2 text-bl1 font-semibold text-sm py-1 px-2 rounded-xl md:text-xl">
                Signup
              </button>
            </Link>
          </div>
          <div className="flex items-center justify-center w-full">
            <img src="/images/socketChat.svg" alt="sc" className="w-[1200px]" />
          </div>
          </div>
          </div>


      </div>
      <div className="w-full bg-pc1/30 p-10">
        <div className="flex items-center justify-between">
          <img src="/Sec-logo.svg" alt="sc" width={200} height={200} />
          <h1 className="text-lg font-extrabold md:text-xl lg:text-4xl text-wl1">
            By ram72
          </h1>
        </div>
      </div>
    </div>
  );
};
