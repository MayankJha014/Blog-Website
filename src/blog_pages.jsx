import React, { useContext, useEffect, useState } from "react";
import Loader from "./assets/Loader.json";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPosts,
  getTags,
  getUser,
  searchPost,
  tagsPosts,
} from "./redux/actions/posts";
import Lottie from "react-lottie";
import moment from "moment";
import themeContext from "./context/theme_context";
import Navbar from "./nav";
import SEO from "./seo";

const BlogPage = () => {
  const dispatch = useDispatch();
  const { post, isLoading } = useSelector((state) => state.posts);
  const { tag } = useSelector((state) => state.tags);
  const [activeTags, setActiveTags] = useState("");

  useEffect(() => {
    dispatch(getTags());
    dispatch(getAllPosts());
  }, []);

  useEffect(() => {
    if (activeTags != "") {
      dispatch(tagsPosts(activeTags));
    }
  }, [activeTags]);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Loader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const theme = useContext(themeContext);

  return (
    <>
      <SEO
        title={`${process.env.WEB_TITLE}`}
        description={`${process.env.WEB_DESCRIPTION}`}
        keywords={`${tag?.data[0]?.properties?.Tags?.multi_select?.options
          .map((tag) => tag.name)
          .join(", ")}`}
      />
      <div
        className={`${
          theme.theme ? "bg-[#dddddd4a] text-black" : "bg-[#1c1c1c] text-white"
        }  h-screen overflow-auto lg:overflow-hidden `}
      >
        <Navbar />
        <div className="w-[95%] xl:w-[70%] m-auto">
          {isLoading ? (
            <Lottie options={defaultOptions} height={400} width={400} />
          ) : (
            <main className=" flex flex-col lg:grid lg:grid-cols-10 gap-4 mt-4">
              <div className="lg:col-span-2 ">
                <span className="rotate-180">🏷️</span>
                <span className="text-lg ml-2">Tags</span>
                <div className="flex gap-4 flex-wrap lg:block my-5">
                  {activeTags != "" ? (
                    <div
                      className={`px-2 py-1 my-2 text-sm cursor-pointer bg-orange-500  rounded-full w-fit `}
                      onClick={() => {
                        setActiveTags("");
                        dispatch(getAllPosts());
                      }}
                    >
                      {activeTags}
                    </div>
                  ) : (
                    tag?.data[0]?.properties?.Tags?.multi_select?.options.map(
                      (x, index) => (
                        <div
                          key={index}
                          style={{
                            backgroundColor:
                              x.color == "default"
                                ? theme.theme
                                  ? "#a5a5a57d"
                                  : "#454242"
                                : x.color,
                          }}
                          className={`px-2 py-1 my-2 text-sm cursor-pointer  rounded-full w-fit ${
                            theme.theme ? " text-black/70 " : " text-white/70 "
                          } `}
                          onClick={() => {
                            setActiveTags(x.name);
                          }}
                        >
                          {x.name}
                        </div>
                      )
                    )
                  )}
                </div>
              </div>
              <div
                className="col-span-5 lg:h-[90vh] overflow-scroll scrollable-content "
                style={{ overscrollBehaviorY: "auto" }}
              >
                <p className="mt-2"> Search</p>
                <input
                  type="text"
                  placeholder="Search Keyword..."
                  className={`block m-auto rounded-2xl ${
                    theme.theme
                      ? "text-black bg-white"
                      : "text-white bg-white/10 "
                  } p-2.5 outline-none border-0 shadow  lg:w-webkit-fill w-4/5`}
                  onChange={(e) => {
                    if (e.target.value != undefined && e.target.value != "") {
                      dispatch(searchPost(e.target.value));
                    }
                  }}
                />
                <div className="w-fit mx-auto lg:hidden">
                  <UserIntroCard />
                </div>
                <div className="mt-4 relative">
                  <p
                    className="text-lg pb-2 font-semibold"
                    style={{ borderBottom: "1px solid #919191" }}
                  >
                    All Posts
                  </p>
                  <div className="flex flex-wrap flex-row gap-6 justify-evenly px-1 items-center">
                    {post?.data?.map((x, index) => (
                      // <Page create={}/>
                      <Link
                        to={`page/${x?.properties?.URL?.url}`}
                        className="no-underline text-white"
                        state={x}
                        key={index}
                      >
                        <Posts
                          postImg={x?.properties?.Photo?.files[0]?.file?.url}
                          title={
                            (x?.icon?.emoji && x?.icon?.emoji) +
                            x?.properties?.Name?.title[0]?.text?.content
                          }
                          description={
                            x?.properties?.Description?.rich_text[0]?.plain_text
                          }
                          created={x.created_time}
                          tags={x?.properties?.Tags?.multi_select}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-span-3 hidden lg:block  lg:h-[90vh] min-w-56 justify-self-center gap-2 lg:overflow-scroll scrollable-content">
                <div className="flex  items-start gap-2">
                  💻 <span className="text-lg text-center">Profile</span>
                </div>
                <div className="w-fit mx-auto hidden lg:block">
                  <UserIntroCard />
                </div>
                <div className="flex  items-start gap-2 mt-14">
                  <span className="text-lg text-center">Services</span>
                </div>
                <div
                  style={{
                    border: "1px solid #5f5f5f4d",
                  }}
                  className={`px-4 py-2   ${
                    theme.theme
                      ? " bg-white text-black/80 shadow"
                      : " bg-[#282828] text-[#A0A0A0] "
                  } rounded-xl mt-4 flex items-center gap-4 hover:bg-white/50`}
                >
                  <a
                    href={process.env.SERVICES_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline contents"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 1024 1024"
                      className="icon"
                      height="1.5em"
                      width="1.5em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm243.7 589.2L512 794 268.3 653.2V371.8l110-63.6-.4-.2h.2L512 231l134 77h-.2l-.3.2 110.1 63.6v281.4zM307.9 536.7l87.6 49.9V681l96.7 55.9V524.8L307.9 418.4zm203.9-151.8L418 331l-91.1 52.6 185.2 107 185.2-106.9-91.4-52.8zm20 352l97.3-56.2v-94.1l87-49.5V418.5L531.8 525z"></path>
                    </svg>
                    <span className=" text-base">
                      {process.env.SERVICES_NAME}
                    </span>
                  </a>
                </div>
                <div className="mt-16 text-lg">💬 Contact</div>
                <div
                  className={`px-4 py-2 ${
                    theme.theme
                      ? " bg-white text-black/80 shadow-xl border"
                      : " bg-[#282828] text-[#A0A0A0] "
                  }  rounded-xl mt-4 flex flex-col gap-4`}
                  style={{
                    border: "1px solid #5f5f5f4d",
                  }}
                >
                  <div className="flex gap-4 cursor-pointer">
                    <a
                      href={process.env.GIT_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline contents"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 1024 1024"
                        className={`icon ${
                          theme.theme ? " text-black/70" : " text-white/30"
                        }`}
                        height="1.5em"
                        width="1.5em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"></path>
                      </svg>
                      <span className="text-base">GitHub</span>
                    </a>
                  </div>
                  <div className="flex gap-4 cursor-pointer">
                    <a
                      href={process.env.INSTAGRAM_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline contents"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 1024 1024"
                        className={`icon ${
                          theme.theme ? " text-black/70" : " text-white/30"
                        }`}
                        height="1.5em"
                        width="1.5em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M512 306.9c-113.5 0-205.1 91.6-205.1 205.1S398.5 717.1 512 717.1 717.1 625.5 717.1 512 625.5 306.9 512 306.9zm0 338.4c-73.4 0-133.3-59.9-133.3-133.3S438.6 378.7 512 378.7 645.3 438.6 645.3 512 585.4 645.3 512 645.3zm213.5-394.6c-26.5 0-47.9 21.4-47.9 47.9s21.4 47.9 47.9 47.9 47.9-21.3 47.9-47.9a47.84 47.84 0 0 0-47.9-47.9zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zm-88 235.8c-7.3 18.2-16.1 31.8-30.2 45.8-14.1 14.1-27.6 22.9-45.8 30.2C695.2 844.7 570.3 840 512 840c-58.3 0-183.3 4.7-235.9-16.1-18.2-7.3-31.8-16.1-45.8-30.2-14.1-14.1-22.9-27.6-30.2-45.8C179.3 695.2 184 570.3 184 512c0-58.3-4.7-183.3 16.1-235.9 7.3-18.2 16.1-31.8 30.2-45.8s27.6-22.9 45.8-30.2C328.7 179.3 453.7 184 512 184s183.3-4.7 235.9 16.1c18.2 7.3 31.8 16.1 45.8 30.2 14.1 14.1 22.9 27.6 30.2 45.8C844.7 328.7 840 453.7 840 512c0 58.3 4.7 183.2-16.2 235.8z"></path>
                      </svg>
                      <span className=" text-sm">Instagram</span>
                    </a>
                  </div>
                  <div className="flex gap-4 cursor-pointer">
                    <a
                      href={process.env.EMAIL_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline contents"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 1024 1024"
                        className={`icon ${
                          theme.theme ? " text-black/70" : " text-white/30"
                        }`}
                        height="1.5em"
                        width="1.5em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0 0 68.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"></path>
                      </svg>
                      <span className=" text-sm">Email</span>
                    </a>
                  </div>
                  <div className="flex gap-4 cursor-pointer">
                    <a
                      href={process.env.LINKEDIN_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline contents"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 1024 1024"
                        className={`icon ${
                          theme.theme ? " text-black/70" : " text-white/30"
                        }`}
                        height="1.5em"
                        width="1.5em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM349.3 793.7H230.6V411.9h118.7v381.8zm-59.3-434a68.8 68.8 0 1 1 68.8-68.8c-.1 38-30.9 68.8-68.8 68.8zm503.7 434H675.1V608c0-44.3-.8-101.2-61.7-101.2-61.7 0-71.2 48.2-71.2 98v188.9H423.7V411.9h113.8v52.2h1.6c15.8-30 54.5-61.7 112.3-61.7 120.2 0 142.3 79.1 142.3 181.9v209.4z"></path>
                      </svg>
                    </a>
                    <span className=" text-sm">LinkedIn</span>
                  </div>
                </div>
              </div>
            </main>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPage;

export const Posts = ({ postImg, title, created, tags, description }) => {
  const theme = useContext(themeContext);

  const dispatch = useDispatch();
  return (
    <div
      className={`w-72 ${
        theme.theme ? "bg-white text-black" : "bg-[#282828]"
      } p-3 rounded-lg cursor-pointer my-2 shadow-2xl`}
      style={{
        border: "1px solid #5f5f5f4d",
      }}
    >
      <img
        src={postImg}
        alt=""
        className="aspect-[12/5] w-full rounded-xl object-cover"
      />
      <p className="text-lg leading-3">{title}</p>
      <p
        className={`text-sm ${
          theme.theme ? "text-black/40 " : "text-white/40"
        }  leading-none`}
      >
        {moment(created).format("MMM. DD, YYYY")}
      </p>
      <p
        className={`text-base ${
          theme.theme ? "text-black/70 " : "text-white/70"
        }  `}
      >
        <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown>
      </p>
      <div className="flex gap-2 flex-wrap">
        {tags?.map((x, index) => (
          <p
            key={index}
            className={`text-xs  ${
              theme.theme
                ? "bg-[#a5a5a57d] text-black/70"
                : "bg-[#454242] text-white/70"
            }  leading-none font-medium w-fit rounded-full px-3 py-2 z-30 `}
            onClick={() => {
              dispatch(tagsPosts(x.name));
            }}
          >
            {x.name}
          </p>
        ))}{" "}
      </div>
    </div>
  );
};

export const UserIntroCard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUser());
  }, []);
  const theme = useContext(themeContext);

  return (
    <div
      className={`px-4 py-1 ${
        theme.theme ? "bg-white shadow-xl" : "bg-[#282828]"
      }  rounded-xl mt-4`}
      style={{
        border: "1px solid #5f5f5f4d",
      }}
    >
      {user?.data?.avatar_url && (
        <img
          src={user?.data?.avatar_url}
          alt=""
          className="w-40 flex justify-center m-auto my-5 h-40 rounded-full"
        />
      )}
      <p
        style={{ lineHeight: 0 }}
        className="text-2xl text-center  font-bold italic"
      >
        {user?.data?.name}
      </p>
      <p style={{ lineHeight: 0 }} className="text-md text-center">
        {process.env.USER_CARD_POSITION}
      </p>
      <p className="w-11/12 leading-5 tracking-wide mt-8">
        {process.env.USER_CARD_QUOTE}
      </p>
    </div>
  );
};
