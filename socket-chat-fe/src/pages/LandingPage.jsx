import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import ParallaxImage from "@/components/Animation";
import { motion } from "motion/react";

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
            <img src="/Sec-logo.svg" alt="socket" width={180} height={125} />
          </div>
          <div className="flex items-center gap-2 md:gap-4">
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
              Chat That's All About{" "}
              <span className="relative">
                Tech{" "}
                <svg
                  width="158"
                  height="11"
                  viewBox="0 0 158 11"
                  fill="none"
                  className="absolute top-8 md:top-9 xl:top-16 left-0 w-[74px] md:w-[94px] xl:w-[158px]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    d="M1 9.5L9.53475 4.26903C13.7752 1.67004 19.1445 1.79449 23.26 4.58714L23.7967 4.95134C27.8308 7.68875 33.138 7.64362 37.125 4.83799L37.6813 4.44652C41.4583 1.7886 46.5093 1.83373 50.2383 4.55873L50.7232 4.91308C54.4156 7.61137 59.4678 7.46135 62.9936 4.54874V4.54874C66.2877 1.82757 70.9466 1.49953 74.5895 3.73225L77.693 5.63445C81.4813 7.95629 86.3162 7.66637 89.7998 4.90847V4.90847C93.4772 1.99723 98.6315 1.85176 102.467 4.55096L103.659 5.38997C107.075 7.79329 111.699 7.51031 114.796 4.70851V4.70851C117.85 1.94481 122.399 1.62765 125.807 3.94065L128.213 5.57314C131.627 7.8896 136.171 7.62541 139.293 4.92891V4.92891C142.605 2.06868 147.481 1.9645 150.912 4.68069L157 9.5"
                    stroke="#CD83CB"
                    stroke-width="3"
                  />
                </svg>
              </span>{" "}
              &{" "}
              <span className="relative">
                Innovation
                <svg
                  width="365"
                  height="10"
                  viewBox="0 0 365 10"
                  fill="none"
                  className="absolute top-8 md:top-9 xl:top-16 left-0 w-[168px] md:w-[204px] xl:w-[365px]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    d="M1 8L9.76123 4.28311C14.6797 2.1965 20.259 2.33191 25.0704 4.65467V4.65467C29.5068 6.79641 34.613 7.08543 39.2629 5.458L45.0352 3.43768C49.4802 1.88194 54.3701 2.22892 58.5508 4.39672V4.39672C62.9633 6.68466 68.1531 6.93877 72.768 5.09282L75.5427 3.98291C80.3075 2.07701 85.6429 2.19357 90.3199 4.30575L91.313 4.75424C95.8603 6.80787 101.091 6.70468 105.553 4.47329V4.47329C109.955 2.27248 115.107 2.14047 119.615 4.11296L121.202 4.80734C125.848 6.83989 131.138 6.80872 135.759 4.72157L137.071 4.12916C141.429 2.16124 146.462 2.37853 150.633 4.71469V4.71469C154.367 6.80551 158.814 7.21001 162.863 5.82722L169.807 3.45621C174.409 1.88477 179.449 2.22447 183.799 4.39926V4.39926C188.384 6.69215 193.726 6.94005 198.504 5.08176L202.355 3.58408C206.571 1.94447 211.294 2.23542 215.277 4.38012V4.38012C219.514 6.66163 224.573 6.8381 228.959 4.85742L230.625 4.10482C234.967 2.144 239.968 2.27945 244.197 4.47242V4.47242C248.486 6.69666 253.566 6.80265 257.944 4.75927L258.954 4.28819C263.397 2.21489 268.55 2.32243 272.903 4.57925V4.57925C277.081 6.74582 282.008 6.93591 286.341 5.09771L288.495 4.18396C293.279 2.15434 298.694 2.21652 303.43 4.35547L304.826 4.98594C309.049 6.89298 313.906 6.79715 318.05 4.72505L319.521 3.98931C323.252 2.12414 327.671 2.26656 331.274 4.36803V4.36803C335.121 6.61237 339.879 6.61237 343.726 4.36803V4.36803C347.329 2.26656 351.748 2.12414 355.479 3.98931L363.5 8"
                    stroke="#977CEF"
                    stroke-width="3"
                  />
                </svg>
              </span>
            </h2>
            <p className="body-1 text-center md:text-start font-medium mt-3">
              Socket-Chat is the ultimate space for developers and tech
              enthusiasts to connect. Stay ahead with the latest trends, discuss
              programming, AI and build a community that thrives on
              knowledge-sharing.
            </p>
          </div>
          <div className="relative w-[300px] md:w-[400px] xl:w-[600px] shadow-2xl">
            <div className="absolute -top-2 md:-left-2 size-36 md:w-96 md:h-72 rounded bg-[#CD83CB] mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -top-2 md:left-80 left-36 size-36 md:w-80 md:h-72 rounded bg-[#977CEF] mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-4 md:-left-2 size-36 md:w-96 md:h-56 rounded bg-[#977CEF] mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-4 md:left-80 left-36 size-36 md:w-80 md:h-56 rounded bg-[#CD83CB] mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
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

        <div className="relative my-2 sm:my-32">
          <ParallaxImage
            src="/images/fry_sc.png"
            alt="fry"
            initialTop={-80}
            speed={0.2}
          />
          <div className="relative z-10 bg-wl3/10 backdrop-blur-[100px] border border-wl1/20 shadow-lg/30 shadow-wl3 rounded-[44px]">
            <div className="flex flex-col-reverse md:flex-row justify-between items-center">
              <div className="relative w-[340px] md:w-[648px]">
                <div className="relative px-8 py-4 lg:px-32 lg:py-16 m-6 g5 rounded-[44px] shadow-2xl/30">
                  <img
                    src="/images/sigChat.png"
                    alt="single-chat"
                    className="lg:hover:scale-105 lg:transition-all lg:duration-500 size-56 md:size-96 object-contain"
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

        <div className="relative my-20 sm:my-40">
          <div className="absolute -top-16 left-56 md:left-[604px] xl:-top-38 xl:left-[900px] z-200">
            <img
              src="/images/box.png"
              alt="box"
              className="size-28 xl:size-60"
            />
          </div>
          <div className="relative z-10 bg-wl3/10 backdrop-blur-[100px] border border-wl1/20 shadow-lg/30 rounded-[44px]">
            <div className="flex flex-col-reverse md:flex-row-reverse justify-between items-center">
              <div className="relative w-[340px] md:w-[648px]">
                <div className="relative px-8 py-4 lg:px-32 lg:py-16 m-6 g3 shadow-2xl/30 rounded-[44px]">
                  <div className="flex items-center justify-center">
                    <img
                      src="/images/group.png"
                      alt="single-chat"
                      className="lg:hover:scale-105 lg:transition-all lg:duration-500 size-56 md:size-96 object-contain"
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

        <div className="relative my-20 sm:my-40">
          <div className="bg-wl3/10 backdrop-blur-[100px] border border-wl1/20 shadow-lg/30 rounded-[44px]">
            <div className="flex flex-col-reverse md:flex-row justify-between items-center">
              <div className="relative w-[340px] md:w-[648px]">
                <div className="relative px-8 py-4 lg:px-32 lg:py-16 m-6 g4 shadow-2xl/30 rounded-[44px]">
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src="/images/user1.png"
                      alt="single-chat"
                      className="lg:hover:scale-105 lg:transition-all lg:duration-500 size-56 md:size-96 object-contain"
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
          <div className="absolute -top-150 left-56 md:left-250 z-100 size-28">
            <ParallaxImage
              src="/images/onion.png"
              alt="onion"
              initialTop={0}
              speed={0.2}
            />
          </div>
        </div>

        <div className="relative my-20 sm:my-40">
          <div className="bg-wl3/10 backdrop-blur-[100px] border border-wl1/20 shadow-lg/30 rounded-[44px]">
            <div className="flex flex-col-reverse md:flex-row-reverse justify-between items-center">
              <div className="relative w-[340px] md:w-[648px]">
                <div className="relative px-8 py-4 lg:px-16 lg:py-16 m-6 g1 shadow-2xl/30 rounded-[44px]">
                  <img
                    src="/images/online.png"
                    alt="single-chat"
                    className="lg:hover:scale-105 lg:transition-all lg:duration-500 h-56 md:h-96 object-contain"
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

        <div className="relative my-20 sm:my-40">
          <div className="relative z-10 bg-wl3/10 backdrop-blur-[100px] border border-wl1/20 shadow-lg/30 rounded-[44px]">
            <div className="flex flex-col-reverse md:flex-row justify-between items-center">
              <div className="relative w-[340px] md:w-[648px]">
                <div className="relative px-8 py-4 lg:px-32 lg:py-16 m-6 g6 shadow-2xl/30 rounded-[44px]">
                  <img
                    src="/images/group-chat.png"
                    alt="group-chat"
                    className="lg:hover:scale-105 lg:transition-all lg:duration-500 size-56 md:size-96 object-contain"
                  />
                </div>
              </div>
              <div className="relative w-[300px] md:w-[480px] mx-2 mt-4 md:mx-auto">
                <div className="text-wl2 text-4xl text-start font-extrabold uppercase">
                  Chat like you're in the same room by creating your own groups
                </div>
                <div className="body-1 text-start font-medium">
                  Experience real-time, high-quality conversations with low
                  latency, making it feel like you're brainstorming the next big
                  idea with friends or colleagues. Whether you're discussing the
                  latest tech trends, coding together, or sharing insights,
                  Socket-Chat keeps you connected seamlessly.
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -top-225 left-60 md:left-250 -z-1">
            <ParallaxImage
              src="/images/round.png"
              alt="round"
              initialTop={0}
              speed={0.2}
            />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-250 -z-1">
            <ParallaxImage
              src="/images/coin_sc.png"
              alt="coin"
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
              <img
                src="/images/socketChat.svg"
                alt="sc"
                className="w-[1200px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-pc1/30 p-10">
        <div className="flex items-center justify-between">
          <img src="/Sec-logo.svg" alt="sc" width={164} height={164} />
          <h1 className="text-sm font-extrabold md:text-xl lg:text-4xl text-wl1">
            By Ram-r72.rr
          </h1>
        </div>
      </div>
    </div>
  );
};
