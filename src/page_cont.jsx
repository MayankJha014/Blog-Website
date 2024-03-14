import React, { useContext, useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./assets/Loader.json";
import {
  getComment,
  getPageData,
  getPostTitle,
  getUser,
  postComment,
} from "./redux/actions/posts";
import moment from "moment";
import { addCommentData } from "./redux/slice/comment";
import Lottie from "react-lottie";
import themeContext from "./context/theme_context";
import Navbar from "./nav";
import SEO from "./seo";

const PageCont = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { title } = useSelector((state) => state.title);
  const { pageData, isLoading } = useSelector((state) => state.pageData);

  const postId = params.pageId;

  let { state } = useLocation();

  useEffect(() => {
    dispatch(getPostTitle(postId));
    dispatch(getPageData(postId));
    dispatch(getUser());
    console.log(state);
  }, []);

  const handleScrollUp = () => {
    const main = document.getElementById("main-content");
    console.log(main.scrollTop);
    main.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Loader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { user } = useSelector((state) => state.users);
  const theme = useContext(themeContext);

  return (
    <>
      <SEO
        title={`${state?.properties?.Name?.title[0]?.text?.content}`}
        description={`${state?.properties?.Description?.rich_text[0]?.plain_text}`}
        keywords={`${state?.properties?.Tags?.multi_select
          .map((tag) => tag.name)
          .join(", ")}`}
      />
      <div
        className={`${
          theme.theme ? "bg-[#dddddd4a] text-black" : "bg-[#1c1c1c] text-white"
        }  h-screen overflow-auto `}
        id="main-content"
      >
        <Navbar />
        <div className="w-[95%] sm:w-4/5 lg:w-[70%] m-auto ">
          {isLoading ? (
            <div className="h-[85vh] flex items-center ">
              <Lottie options={defaultOptions} height={400} width={400} />
            </div>
          ) : (
            <main
              className={` ${
                theme.theme ? "bg-white shadow-xl" : "bg-[#282828]"
              }   mx-auto rounded-2xl mt-4`}
              style={{ borderBottom: "1px solid #919191" }}
            >
              <div className="my-4 relative">
                <div className="flex flex-col justify-evenly ">
                  {title?.data?.cover != null && (
                    <img
                      src={title?.data?.cover?.external?.url}
                      alt=""
                      className="aspect-video object-cover h-56 rounded-t-2xl"
                    />
                  )}
                  {
                    <h1
                      className={`px-4 leading-4 ${
                        "text-" +
                        title?.data?.properties?.title.title[0].annotations
                          .color
                      }`}
                    >
                      {title?.data?.icon != null &&
                        title?.data?.icon?.emoji + " "}
                      {title?.data?.properties?.title.title[0].plain_text}
                    </h1>
                  }
                  <div className=" flex items-center gap-2 text-sm text-white/40 mx-4">
                    <p className="m-0">{user?.data?.name}</p>
                    <p className="m-0">|</p>
                    <p className="m-0">
                      {moment(state.last_edited_time).format("MMM. DD, YYYY")}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap mx-4">
                    {state?.properties?.Tags?.multi_select?.map((x, index) => (
                      <p
                        key={index}
                        className={`text-xs text-white/70 bg-[#454242] leading-none font-medium w-fit rounded-full px-3 py-2 `}
                        onClick={() => {
                          dispatch(tagsPosts(x.name));
                        }}
                      >
                        {x.name}
                      </p>
                    ))}{" "}
                  </div>
                  <div className="px-10">
                    {pageData?.data?.map((a, index) => {
                      return (
                        <>
                          <div>
                            <Markdown remarkPlugins={[remarkGfm]}>
                              {a.parent}
                            </Markdown>
                            {a?.children.length != 0 &&
                              a?.children?.map((b, index) => (
                                <>
                                  <Markdown remarkPlugins={[remarkGfm]}>
                                    {b.parent}
                                  </Markdown>
                                  {b?.children.length != 0 &&
                                    b?.children?.map((c, index) => (
                                      <>
                                        <Markdown remarkPlugins={[remarkGfm]}>
                                          {c.parent}
                                        </Markdown>
                                        {c?.children.length != 0 &&
                                          c?.children?.map((d, index) => (
                                            <Markdown
                                              remarkPlugins={[remarkGfm]}
                                            >
                                              {d.parent}
                                            </Markdown>
                                          ))}
                                      </>
                                    ))}
                                </>
                              ))}
                          </div>
                        </>
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-5">
                    <Link to="/" className="no-underline">
                      <div className="text-white/40 m-auto py-5 px-3 cursor-pointer hover:text-white bg-black/50 fixed bottom-10 hidden sm:block sm:left-10   rounded-full ">
                        {" "}
                        ← Back
                      </div>
                    </Link>
                    <div
                      onClick={handleScrollUp}
                      className="text-white/40 m-auto py-5 px-3 cursor-pointer hover:text-white bg-black/50 fixed bottom-10 right-10   rounded-full "
                    >
                      ↑ Top
                    </div>
                  </div>
                  <Comment />
                </div>
              </div>
            </main>
          )}
        </div>
      </div>
    </>
  );
};

export default PageCont;

export const Comment = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [comt, setComt] = useState();
  const postId = params.pageId;

  const { comment } = useSelector((state) => state.comments);
  const handleComment = async (e) => {
    e.preventDefault();
    const formData = {
      id: postId,
      comData: comt,
    };
    if (comt != undefined && comt != "") {
      const res = await postComment(formData);
      dispatch(addCommentData(res));
    }
  };

  useEffect(() => {
    dispatch(getComment(postId));
  }, []);

  const theme = useContext(themeContext);

  return (
    <section
      className={` ${
        theme.theme
          ? "bg-white shadow-xl text-black"
          : "bg-[#282828] text-white"
      } py-8 lg:py-10 antialiased`}
    >
      <div className="w-4/5 mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold ">
            Discussion ({comment?.length})
          </h2>
        </div>
        <form className="mb-6">
          <div className="py-2 px-4 mb-4 bg-black/20 rounded-lg rounded-t-lg border border-gray-200 ">
            <label for="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows="6"
              className={`px-0 w-full text-sm  border-0 focus:ring-0 focus:outline-none bg-transparent ${
                theme.theme ? " text-black" : " text-white"
              }`}
              placeholder="Write a comment..."
              required
              value={comt}
              onChange={(e) => setComt(e.target.value)}
            ></textarea>
          </div>
          <button
            type="button"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white rounded-lg  bg-black hover:scale-110"
            onClick={(e) => handleComment(e)}
          >
            Post comment
          </button>
        </form>
        {comment?.map((x, index) => (
          <article className="px-6 py-2 mb-3 text-base rounded-tl-none rounded-2xl bg-black/20 border-t border-gray-200">
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm  font-semibold">
                  <img
                    className="mr-2 w-6 h-6 rounded-full"
                    src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                    alt="Bonnie Green"
                  />
                  User
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <time pubdate datetime="2022-03-12" title="March 12th, 2022">
                    {moment(x?.updatedAt).format("MMM. DD, YYYY")}
                  </time>
                </p>
              </div>
            </footer>
            <p>{x?.comment}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
