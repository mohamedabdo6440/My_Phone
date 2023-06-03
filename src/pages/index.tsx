import Image from "next/image";
import { useRouter } from "next/router";

// local modules
import routes from "@/constants/routes";
import useMediaQuery from "@/hooks/useMediaQueries";
import { useAppDispatch, useAppSelector } from "@/rtk/hook";
import { HomePage, setPage } from "@/rtk/features/homeSlice";
import { NextPageWithLayout } from "./_app";
import styles from "@/styles/pages/home.module.scss";

// local static files
import Layout from "@/components/forms/Layout";
import headphone from "@/images/mobile_headphone.png";
import backgroundmobile from "@/images/mobile_home_background.png";
import watch from "@/images/mobile_watch.png";
import bglaptop from "@/images/web_bg_main.png";
import buysmart from "@/images/web_buysmart.png";
import buysmartdark from "@/images/web_dark_buysmart.png";
import repairsmartdark from "@/images/web_dark_repairsmart.png";
import sellsmartdark from "@/images/web_dark_sellsmart.png";
import testmydevicedark from "@/images/web_dark_testmydevice.png";
import headertext from "@/images/web_header.png";
import background from "@/images/web_home_background.png";
import repairsmart from "@/images/web_light_repairsmart.png";
import sellsmart from "@/images/web_light_sellsmart.png";
import testmydevice from "@/images/web_light_testmydevice.png";
import bgpsp from "@/images/web_psp.png";
import search from "@/images/web_searchicon.png";
import useToast from "@/hooks/useToast";
import { useEffect } from "react";
import { start } from "@/rtk/features/buySlice";
import { setDataToNull } from "@/rtk/features/orderSlice";
import { startSell } from "@/rtk/features/sellSlice";

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const { page } = useAppSelector((state) => state.home);
  const dispatch = useAppDispatch();
  const mobile = useMediaQuery("(max-width: 600px)");
  const laptopL = useMediaQuery("(min-width: 1500px)");
  const { theme }: any = useAppSelector((state) => state.theme);
  const toast = useToast();

  const submitHandler: React.FormEventHandler = (e) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);

    const { search } = Object.fromEntries(data);

    if (!search) return toast.error("what are you looking for?");

    router.push(`/search?search=${search}`);
  };

  const handleNavigateToOtherPages = ({
    page,
    route,
  }: {
    page: HomePage;
    route: string;
  }) => {
    dispatch(setPage(page));
    router.push(route);
  };
  const Button = (props: { route: any; title: HomePage }) => {
    return (
      <button
        onClick={() =>
          handleNavigateToOtherPages({ page: props.title, route: props.route })
        }
        className={`${
          page === props.title ? styles.page_active : null
        } capitalize`}
      >
        {props.title}
      </button>
    );
  };
  const ButtonFilter = (props: { title: HomePage }) => {
    return (
      <button
        onClick={() => dispatch(setPage(props.title))}
        className={`${
          page === props.title ? styles.page_active : null
        } font-bold capitalize`}
      >
        {props.title}
      </button>
    );
  };
  const Card = (props: {
    title: string;
    image: { light: any; dark: any; alt: string };
    params: { page: HomePage; route: any };
  }) => {
    return (
      <div className="card_wrapper">
        <div
          className={`${styles.serviceCardStyle}`}
          onClick={() => handleNavigateToOtherPages(props.params)}
        >
          <Image
            src={theme === "light" ? props.image.light : props.image.dark}
            alt={props.image.alt}
          />
          <h4>{props.title}</h4>
        </div>
      </div>
    );
  };

  return (
      <header className={`${styles.header} min-h-[calc(100vh-100px)]`}>
        <div className={`${styles.title} EditPadding relative z-10`}>
          <Image src={headertext} alt="All your tech" />
          <p className={`${theme === "light" ? styles.light : styles.dark}`}>
            From buying, selling, testing and fixing.
            <br /> We have all your devices covered.
          </p>
        </div>
        <div className="relative z-10">
          <div
            className={`${styles.pages_mobile}  ${
              theme === "light" ? styles.light : styles.dark
            }`}
          >
            {/* <Button title={"buy"} route={routes.BUY} />
                    <Button title={"sell"} route={routes.SELL} />
                    <Button title={"repair"} route={routes.REPAIR} /> */}
            <ButtonFilter title={"buy"} />
            <ButtonFilter title={"sell"} />
            <ButtonFilter title={"repair"} />
          </div>
          <div
            className={`${styles.option} EditWithSearch ${
              theme === "light" ? `${styles.light} boxShadow` : styles.dark
            }`}
          >
            <div
              className={`${styles.pages} ${
                theme === "light" ? styles.light : styles.dark
              }`}
            >
              {/* <Button title={"buy"} route={routes.BUY} />
                        <Button title={"sell"} route={routes.SELL} />
                        <Button title={"repair"} route={routes.REPAIR} /> */}
              <ButtonFilter title={"buy"} />
              <ButtonFilter title={"sell"} />
              <ButtonFilter title={"repair"} />
            </div>
            <form onSubmit={submitHandler}>
              <input
                className={theme === "light" ? styles.light : styles.dark}
                type="text"
                name="search"
                placeholder="type device name here"
              />
              <button
                type="submit"
                className="flex justify-center items-center"
              >
                <Image src={search} alt="Search Button" />
              </button>
            </form>
          </div>
        </div>
        <div
          className={`${styles.card_wrapper}  relative z-10  ${
            theme === "light" ? styles.light : styles.dark
          }`}
          onClick={() => {
            dispatch(start({}));
            dispatch(setDataToNull({}));
            dispatch(startSell({}));
          }}
        >
          <Card
            title={"Buy Smart"}
            image={{
              light: buysmart,
              dark: buysmartdark,
              alt: "Buy Smart Icon",
            }}
            params={{ page: "buy", route: routes.BUY }}
          />
          <Card
            title={"Sell Smart"}
            image={{
              light: sellsmart,
              dark: sellsmartdark,
              alt: "Sell Smart Icon",
            }}
            params={{ page: "sell", route: routes.SELL }}
          />
          <Card
            title={"Repair Smart"}
            image={{
              light: repairsmart,
              dark: repairsmartdark,
              alt: "Repair Smart Icon",
            }}
            params={{ page: "repair", route: routes.REPAIR }}
          />
          <div className="card_wrapper">
            <div >
              <Image
                src={theme === "light" ? testmydevice : testmydevicedark}
                alt="Test my device Icon"
              />
              <h4>Test my device</h4>
            </div>
          </div>
          <div className={styles.card_bg}>
            <Image src={watch} alt="Watch" />
            <Image src={headphone} alt="Headphone" />
          </div>
        </div>
        <div className="absolute || w-full || h-full || top-[-4%]  ] || imgBackGround  || left-0 ||  z-0">
          {/* {laptopL ? (
                    <>
                        <div>
                            <Image src={bgpsp} alt="Main Background" priority />
                        </div>
                        <div>
                            <Image src={bglaptop} alt="Main Background" priority />
                        </div>
                    </>
                ) : (
                    )} */}
          <div className="w-100">
            <Image
              src={mobile ? backgroundmobile : background}
              alt="Main Background"
              priority
            />
          </div>
        </div>
      </header>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
